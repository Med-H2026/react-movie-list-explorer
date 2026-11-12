import { createContext,useState, useContext,useEffect } from "react";

const MovieContext = createContext()
export const useMovieContext = ()=> useContext(MovieContext)

export const MovieProvider = ({children})=> {    
/*Read from localStorage on first load */
    const [favorites,setFavorites] = useState(() =>{
        try{
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        }catch{
            return [];
        }
    })
   /* useEffect(()=>{
        const storedFavs = localStorage.getItem('favorites')
        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    },[])*/
    /*Save to localStorage every time favorites change */
    useEffect(()=>{
    localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])
    const addToFavorites = (movie)=>{
        setFavorites(prev => [...prev, movie])
    }
    const removeFromFavorites = (movieId) =>{
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    const isFavorite=(movieId)=>{
        return favorites.some(movie => movie.id === movieId)
    }
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}