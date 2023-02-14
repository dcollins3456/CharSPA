import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import {db} from '@/firebase'

export const useSpaStore = defineStore({
  id: 'charspa',
  state: () => ({
    Characters: [],
    currentCharacter: {},
  }),
  getters: {

  },
  actions: {
    fetchCharacters() {
      onSnapshot(collection(db, "Characters"), (querySnapshot) => {
        const fbChars = [];
        querySnapshot.forEach((doc) => {
          const char = {
            id: doc.id,
            charname: doc.data().charname,
            playbook: doc.data().playbook,
            pb_description: doc.data().pb_description,
            pbxp: doc.data().pbxp,
            stress: doc.data().stress
            }
          fbChars.push(char)
        });
        this.Characters = fbChars;
        console.log("Characters loaded: ", this.Characters)
        if(!this.currentCharacter){
          this.currentCharacter = this.Characters.value[0]
        }
        console.log("currentCharacter = ", this.currentCharacter)
      });
    },
    selectCharacter(id) {
      const docRef = doc(db, "Characters", id);
      return getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          this.currentCharacter = docSnap.data();
          return docSnap.data();
        } else {
          console.log("No such document!");
        }
      });
    }
  }
})
