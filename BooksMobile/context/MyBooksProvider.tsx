import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MyBooksContextType = {
  isBookSaved: (book: Book) => boolean;
  onToggleSaved: (book: Book) => void;
  savedBooks: Book[];
};

const MyBooksContext = createContext<MyBooksContextType>({
  isBookSaved: () => false,
  onToggleSaved: () => {},
  savedBooks: [],
});

type Props = {
  children: React.ReactNode;
};

const MyBooksProvider = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loaded) {
      persistData();
    }
  }, [savedBooks]);

  const isBookSaved = (book: Book) => {
    return savedBooks.some(
      (savedBook) => JSON.stringify(savedBook) === JSON.stringify(book)
    );
  };

  const onToggleSaved = (book: Book) => {
    if (isBookSaved(book)) {
      setSavedBooks((books) => books.filter((item) => item !== book));
    } else {
      setSavedBooks((books) => [book, ...books]);
    }
  };

  const persistData = async () => {
    await AsyncStorage.setItem("booksData", JSON.stringify(savedBooks));
  };

  const loadData = async () => {
    const dataString = await AsyncStorage.getItem("booksData");
    if (dataString) {
      const items = JSON.parse(dataString);
      setSavedBooks(items);
    }
    setLoaded(true);
  };

  return (
    <MyBooksContext.Provider value={{ isBookSaved, onToggleSaved, savedBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBooksContext);

export default MyBooksProvider;
