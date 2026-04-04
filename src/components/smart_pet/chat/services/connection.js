// src/services/connection.js
import { database } from './firebase';
import { ref, onValue, set, serverTimestamp } from 'firebase/database';

export class ConnectionManager {
  static initialize(userId) {
    // Monitor connection state
    const connectedRef = ref(database, '.info/connected');
    const userStatusRef = ref(database, `users/${userId}/status`);
    const lastOnlineRef = ref(database, `users/${userId}/lastOnline`);

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        // When we disconnect, update the last online timestamp
        set(userStatusRef, 'online');
        set(lastOnlineRef, serverTimestamp());

        // When user disconnects, update the last online timestamp
        onDisconnect(userStatusRef).set('offline');
        onDisconnect(lastOnlineRef).set(serverTimestamp());
      } else {
        // We're offline
        set(userStatusRef, 'offline');
        set(lastOnlineRef, serverTimestamp());
      }
    });
  }

  static async handleConnectionError(callback) {
    const connectedRef = ref(database, '.info/connected');
    onValue(connectedRef, (snap) => {
      if (snap.val() === false) {
        callback('disconnected');
      } else {
        callback('connected');
      }
    });
  }
}