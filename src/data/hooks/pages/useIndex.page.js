import { useState, useMemo } from "react";
import {mutate} from 'swr';
import { useApi } from "../useApi";
import { ApiService } from "../../services/ApiService";

export function useIndex(){

    const maxTextLength = 150,
    user = {
        name:'Julio',
        username:'@juliohortencio',
        picture:'https://github.com/JulioNepomuceno.png'
    },
    [text,setText] = useState(''),
    tweetsList = useApi('tweets').data,
    sortedTweetList = useMemo(()=>{
      return  (tweetsList || []).sort((a,b) => (a.data.date < b.data.date ? 1 : -1));
    },[tweetsList]);

    function onTextChange(event){
        const text = event.target.value;
        if(text.length <= maxTextLength){
            setText(text);
        }
    }

    async function sendTweet(){
       await ApiService.post('tweets',{
            data:{
                user,
                text,
                date: new Date().toISOString()
            }
        })
        setText('');
        mutate('tweets');
    }

    return{
        user,
        text,
        onTextChange,
        maxTextLength,
        sendTweet,
        sortedTweetList
    }
}