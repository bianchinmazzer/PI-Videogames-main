

const initialState = {
    videogames: [],
    allVideogames: [],
    generos: [],
    details: [],
    videogames2: []
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
                videogames2: action.payload
            }
        case "GET_NAME_VIDEOGAME":
            return {
                ...state,
                videogames: action.payload
            }
        case "GET_GENEROS":
            return {
                ...state,
                generos: action.payload
            }
        case "POST_VIDEOGAME":
            return {
                ...state
            }
        case "FILTER_CREATED":
            const allVideogames = state.allVideogames
            const createdFilter = action.payload === "created" ? allVideogames.filter(e => e.createdInDb) : 
            action.payload === "exst"? allVideogames.filter(e => !e.createdInDb) : 
            action.payload === "all" && allVideogames
            // allVideogames.filter(e => !e.createdInDb)
            return {
                ...state,
                videogames: createdFilter
            }
        case "FILTER_GENERO": 
        // const todosLosGeneros = state.allVideogames
        //  const generoFiltered = action.payload === 'all' ? todosLosGeneros
        //  : todosLosGeneros.filter((e)=>
        //  e.genero?.includes(action.payload))              
         
        //  return {
        //      ...state,
        //      videogames: generoFiltered,
        //  }
        const vg = state.allVideogames
        var arrGenero = []
        
        if(action.payload === "all") {
           return {
               ...state,
               videogames: vg
           }
       }
            if(action.payload !== "all"){
                 for(let i=0; i<vg.length; i++) {
                        for(let j=0; j<vg[i].genero.length; j++) {
                        if(action.payload === vg[i].genero[j].name) {
                         arrGenero.push(vg[i])
                        }
                        }
                        }
                        }
        
         return {
            ...state,
            videogames: arrGenero
         }
          

        
        case "ORDER_BY_NAME":
            let sortArr = action.payload === "asc" ?
                state.videogames.sort(function(a, b) {
                    if(a.name[0].toLowerCase() > b.name[0].toLowerCase()) {
                        return 1;
                    }
                    if(b.name[0].toLowerCase() > a.name[0].toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function(a, b) {
                    if(a.name[0].toLowerCase() > b.name[0].toLowerCase()) {
                        return -1;
                    }
                    if(b.name[0].toLowerCase() > a.name[0].toLowerCase()) {
                        return 1;
                    }
                    return 0
                })
                return {
                    ...state,
                    videogames: sortArr
                }
            case "ORDER_BY_RATING": 
            let sortRating = action.payload === "ascrat" ?
            state.videogames.sort(function(a, b) {
                if(a.rating > b.rating) {
                    return 1;
                }
                if(b.rating > a.rating) {
                    return -1;
                }
                return 0
            }) :
            state.videogames.sort(function(a, b) {
                if(a.rating > b.rating) {
                    return -1;
                }
                if(b.rating > a.rating) {
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                videogames: sortRating
            }
        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload
            }
            default: return state;
    }
}