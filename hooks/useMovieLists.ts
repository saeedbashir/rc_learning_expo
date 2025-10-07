import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebaseConfig';

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  [key: string]: any;
};

type MovieList = {
  id: string;
  userId: string;
  name: string;
  movies: Movie[];
};

export function useMovieLists() {
  const [lists, setLists] = useState<MovieList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Load user from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.uid);
        await fetchLists(user.uid);
      }
      setLoading(false);
    })();
  }, []);

  // Fetch all lists for the current user
  const fetchLists = async (uidParam?: string) => {
    const uid = uidParam || userId;
    if (!uid) return;

    try {
      const q = query(collection(db, 'movieLists'), where('userId', '==', uid));
      const snapshot = await getDocs(q);

      const userLists: MovieList[] = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<MovieList, 'id'>;
        return { id: doc.id, ...data };
      });

      setLists(userLists);
    } catch (err) {
      console.error('Failed to fetch lists:', err);
    }
  };

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
    setLists(prev => [...prev, newList]);
    return newList;
  };

  // Add a movie to a specific list
  const addMovieToList = async (listId: string, movie: Movie) => {
    try {
      const listRef = doc(db, 'movieLists', listId);
      const listSnap = await getDoc(listRef);

      if (listSnap.exists()) {
        const data = listSnap.data() as MovieList;
        const updatedMovies = data.movies.find(m => m.id === movie.id)
          ? data.movies // skip duplicates
          : [...data.movies, movie];

        await updateDoc(listRef, { movies: updatedMovies });
        setLists(prev => prev.map(l => (l.id === listId ? { ...l, movies: updatedMovies } : l)));
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
        setLists(prev => prev.map(l => (l.id === listId ? { ...l, movies: updatedMovies } : l)));
      }
    } catch (err) {
      console.error('Failed to remove movie:', err);
    }
  };

  // Delete a list completely
  const deleteList = async (listId: string) => {
    try {
      await deleteDoc(doc(db, 'movieLists', listId));
      setLists(prev => prev.filter(l => l.id !== listId));
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
    fetchLists,
  };
}
