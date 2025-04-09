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

    constructor(
    ) { }

    private db = getFirestore();
    private usersCollection = collection(this.db, 'users');

    getAll(): Observable<User[]> {
        return collectionData(this.usersCollection, { idField: 'sys_id' }) as Observable<User[]>;
    }

    add(user: User): Promise<any> {
        return addDoc(this.usersCollection, user);
    }

    update(sys_id: string, user: Partial<User>): Promise<void> {
        const userDoc = doc(this.firestore, `users/${sys_id}`);
        return updateDoc(userDoc, user);
    }

    delete(sys_id: string): Promise<void> {
        const userDoc = doc(this.firestore, `users/${sys_id}`);
        return deleteDoc(userDoc);
    }
}