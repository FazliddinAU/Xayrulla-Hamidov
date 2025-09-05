import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
const serviceAccount = require("./firebase-service-account.json"); 

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
  }

  async sendPush(token: string, payload: { title: string; body: string; data?: any }) {
    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      token,
      data: payload.data || {},
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('✅ FCM notification sent:', response);
    } catch (error) {
      console.error('❌ Error sending FCM notification:', error);
    }
  }
}
