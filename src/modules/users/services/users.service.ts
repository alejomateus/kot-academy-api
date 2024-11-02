import { PaginationDTO } from '@dto/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ErrorManager } from '@utils/error.manager';
import * as bcrypt from 'bcrypt';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { UserDTO } from '../dto/user.dto';
import { IUser } from '../models/user.interface';

@Injectable()
export class UsersService {
  private readonly userCollection = this.firebase.firestore.collection('users');

  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async create(
    data: Omit<UserDTO, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IUser> {
    try {
      if (await this.userExist(data)) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'The user with this email or phone exists',
        });
      }
      const now = new Date();
      const user = {
        ...data,
        createdAt: now,
        updatedAt: now,
      } as IUser;
      const docRef = await this.userCollection.add({
        ...user,
        password: await bcrypt.hash(data.password, 10),
      });
      delete data.password;
      return { id: docRef.id, ...user };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(queryParams: PaginationDTO): Promise<any> {
    try {
      let query = this.userCollection
        .orderBy('createdAt')
        .limit(parseInt('' + queryParams.page));

      if (queryParams?.lastVisibleId) {
        const lastVisibleDoc = await this.userCollection
          .doc(queryParams.lastVisibleId)
          .get();
        if (lastVisibleDoc.exists) {
          query = query.startAfter(lastVisibleDoc);
        }
      }

      const snapshot = await query.get();
      const users = snapshot.docs.map(
        (
          doc: FirebaseFirestore.QueryDocumentSnapshot<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
          >,
        ) => {
          const user = doc.data();
          delete user.password;
          user.createdAt = user.createdAt?.toDate().toLocaleString();
          user.updatedAt = user.updatedAt?.toDate().toLocaleString();
          return { id: doc.id, ...user };
        },
      );

      return {
        users,
        lastVisible: users.length ? users[users.length - 1].id : null,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async findOne(id: string): Promise<IUser> {
    try {
      const doc = await this.userCollection.doc(id).get();
      if (!doc.exists) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The user not exists',
        });
      }
      const user: any = doc.data();
      delete user.password;
      user.createdAt = user.createdAt?.toDate().toLocaleString();
      user.updatedAt = user.updatedAt?.toDate().toLocaleString();
      return { id: doc.id, ...user };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async userExist(data: UserDTO): Promise<boolean> {
    const snapshot = await this.userCollection
      .where('email', '==', data.email)
      .where('phone', '==', data.phone)
      .get();
    return !snapshot.empty;
  }

  async update(id: string, data: Partial<UserDTO>): Promise<IUser> {
    try {
      const doc = await this.userCollection.doc(id).get();
      if (!doc.exists) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The user not exists',
        });
      }
      delete data.password;
      const updatedData = {
        ...data,
        updatedAt: new Date(),
      };
      await this.userCollection.doc(id).update(updatedData);
      return await this.findOne(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.userCollection.doc(id).delete();
      return true;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    try {
      const snapshot = await this.userCollection
        .where('email', '==', email)
        .get();

      if (snapshot.empty) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Credentials are not valid (username)',
        });
      }

      const userDoc = snapshot.docs[0];
      const user: IUser = await this.findOne(userDoc.id);

      if (!(await bcrypt.compare(password, userDoc.data().password))) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Credentials are not valid (password)',
        });
      }
      return user;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
