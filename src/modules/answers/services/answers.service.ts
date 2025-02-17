import { PaginationDTO } from '@dto/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ErrorManager } from '@utils/error.manager';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class AnswersService {
  private readonly answersCollection =
    this.firebase.firestore.collection('answers');

  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async create(
    data: Omit<any, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<any> {
    try {
      const now = new Date();
      const answer = {
        ...data,
        createdAt: now,
        updatedAt: now,
      } as any;
      const docRef = await this.answersCollection.add({
        ...answer,
      });

      return { id: docRef.id, ...answer };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(queryParams: PaginationDTO): Promise<any> {
    try {
      let query = this.answersCollection
        .orderBy('createdAt')
        .limit(parseInt('' + queryParams.page));
      if (queryParams?.lastVisibleId) {
        const lastVisibleDoc = await this.answersCollection
          .doc(queryParams.lastVisibleId)
          .get();
        if (lastVisibleDoc.exists) {
          query = query.startAfter(lastVisibleDoc);
        }
      }

      const snapshot = await query.get();
      const answers = snapshot.docs.map(
        (
          doc: FirebaseFirestore.QueryDocumentSnapshot<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
          >,
        ) => {
          const answer = doc.data();
          answer.createdAt = answer.createdAt?.toDate().toLocaleString();
          answer.updatedAt = answer.updatedAt?.toDate().toLocaleString();
          return { id: doc.id, ...answer };
        },
      );

      return {
        answers,
        lastVisible: answers.length
          ? answers[answers.length - 1].id
          : null,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
