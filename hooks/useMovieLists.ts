import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebaseConfig';

import { MovieList, TMDBMovie } from '@/type/types';

export function useMovieLists() {
  const [lists, setLists] = useState<MovieList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    (async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      setUserId(user.uid);

      try {
        const q = query(collection(db, 'movieLists'), where('userId', '==', user.uid));

        // Real-time listener for movie lists
        unsubscribe = onSnapshot(q, snapshot => {
          const userLists: MovieList[] = snapshot.docs.map(doc => {
            const data = doc.data() as Omit<MovieList, 'id'>;
            return { id: doc.id, ...data };
          });

          setLists(userLists);
          setLoading(false);
        });
      } catch (err) {
        console.error('Failed to subscribe to movie lists:', err);
        setLoading(false);
      }
    })();

    // Cleanup on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Create a new list (e.g., "Horror", "Watch Later")
  const createList = async (name: string) => {
    if (!userId) return null;
    const newListRef = doc(collection(db, 'movieLists'));
    const newList: MovieList = {
      id: newListRef.id,
      userId,
      name,
      movies: [],
    };
    await setDoc(newListRef, newList);
    // No need to manually update state — onSnapshot handles it
    return newList;
  };

  // Add a movie to a specific list
  const addMovieToList = async (listId: string, movie: TMDBMovie) => {
    try {
      const listRef = doc(db, 'movieLists', listId);
      const listSnap = await getDoc(listRef);

      if (listSnap.exists()) {
        const data = listSnap.data() as MovieList;
        const updatedMovies = data.movies.find(m => m.id === movie.id)
          ? data.movies // skip duplicates
          : [...data.movies, movie];

        await updateDoc(listRef, { movies: updatedMovies });
      }
    } catch (err) {
      console.error('Failed to add movie to list:', err);
    }
  };

  // Remove a movie from a list
  const removeMovieFromList = async (listId: string, movieId: number) => {
    try {
      const listRef = doc(db, 'movieLists', listId);
      const listSnap = await getDoc(listRef);

      if (listSnap.exists()) {
        const data = listSnap.data() as MovieList;
        const updatedMovies = data.movies.filter(m => m.id !== movieId);

        await updateDoc(listRef, { movies: updatedMovies });
      }
    } catch (err) {
      console.error('Failed to remove movie:', err);
    }
  };

  // Delete a list completely
  const deleteList = async (listId: string) => {
    try {
      await deleteDoc(doc(db, 'movieLists', listId));
      // No need to manually update local state — snapshot listener will handle it
    } catch (err) {
      console.error('Failed to delete list:', err);
    }
  };

  return {
    lists,
    loading,
    createList,
    addMovieToList,
    removeMovieFromList,
    deleteList,
  };
}
