import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { FirebaseApp } from '@angular/fire/app';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private firestore = inject(Firestore);
    private db = getFirestore();
    private usersCollection = collection(this.db, 'users');

    constructor() { }

    getAll(): Observable<User[]> {
        return collectionData(this.usersCollection, { idField: 'sys_id' }) as Observable<User[]>;
    }

    async add(user: Omit<User, 'sys_id'>): Promise<string> {
        const docRef = await addDoc(this.usersCollection, user);
        return docRef.id; 
    }

    update(docId: string, user: Partial<User>): Promise<void> {
        const userDoc = doc(this.firestore, `users/${docId}`);
        return updateDoc(userDoc, user);
    }

    delete(docId: string): Promise<void> {
        const userDoc = doc(this.firestore, `users/${docId}`);
        return deleteDoc(userDoc);
    }
}