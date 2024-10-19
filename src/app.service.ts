import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}
  async getHello(): Promise<any> {
    const firestore = this.firebase.firestore;
    const docRef = firestore.collection('products').doc();
    await docRef.set({ name: 'XXXVVEEVA' });
    return docRef.id;
  }
  async uploadFile(file: Express.Multer.File) {    
    const fileName = `${uuidv4()}${file.originalname}`;
    
    const storage = this.firebase.storage;
    const a = await storage
      .bucket()
      .file(fileName)
      .save(file.buffer);
      const imageUrl = `https://storage.googleapis.com/${storage
        .bucket().name}/${fileName}`;

      const b =  await storage
      .bucket()
      .file(fileName).getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutos
      });
      console.log("XXX",b);
      
    return imageUrl;
  }
}
