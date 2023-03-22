// This is a file for API calls
// Here we using redux toolkit for API calls

import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


  export  const shazamCoreApi = createApi({

    reducerPath: 'shazamCoreApi',

    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers)=>{
            headers.set('X-RapidAPI-Key','232df22117msh59cfb3565f3a052p18944ejsnf4aef63726be')

            return headers;
        },
    }),


    endpoints:(builder)=>({
   getToCharts: builder.query({query:()=>'/charts/world'}),
   getSongDetails:builder.query({query:({songid})=>`/tracks/details?track_id=${songid}`}),
   getartistsDetails:builder.query({query:({songid})=>`/tracks/related?track_id=${songid}`})
    }),
  });


 export const {useGetToChartsQuery,useGetSongDetailsQuery,useGetartistsDetailsQuery} = shazamCoreApi;