import { PaginationDTO } from '@dto/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ErrorManager } from '@utils/error.manager';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { IProspect } from '../models/prospect.interface';

@Injectable()
export class ProspectService {
  private readonly prospectCollection =
    this.firebase.firestore.collection('prospects');

  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async create(
    data: Omit<IProspect, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IProspect> {
    try {
      const now = new Date();
      const prospect = {
        ...data,
        createdAt: now,
        updatedAt: now,
      } as IProspect;
      const docRef = await this.prospectCollection.add({
        ...prospect,
      });

      return { id: docRef.id, ...prospect };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(queryParams: PaginationDTO): Promise<any> {
    try {
      let query = this.prospectCollection
        .orderBy('createdAt')
        .limit(parseInt('' + queryParams.page));

      if (queryParams?.lastVisibleId) {
        const lastVisibleDoc = await this.prospectCollection
          .doc(queryParams.lastVisibleId)
          .get();
        if (lastVisibleDoc.exists) {
          query = query.startAfter(lastVisibleDoc);
        }
      }

      const snapshot = await query.get();
      const prospects = snapshot.docs.map(
        (
          doc: FirebaseFirestore.QueryDocumentSnapshot<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
          >,
        ) => {
          const prospect = doc.data();
          prospect.createdAt = prospect.createdAt?.toDate().toLocaleString();
          prospect.updatedAt = prospect.updatedAt?.toDate().toLocaleString();
          return { id: doc.id, ...prospect };
        },
      );

      return {
        prospects,
        lastVisible: prospects.length
          ? prospects[prospects.length - 1].id
          : null,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async findOne(id: string): Promise<IProspect> {
    try {
      const doc = await this.prospectCollection.doc(id).get();
      if (!doc.exists) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The prospect not exists',
        });
      }
      const prospect: any = doc.data();
      prospect.createdAt = prospect.createdAt?.toDate().toLocaleString();
      prospect.updatedAt = prospect.updatedAt?.toDate().toLocaleString();
      return { id: doc.id, ...prospect };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.prospectCollection.doc(id).delete();
      return true;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
