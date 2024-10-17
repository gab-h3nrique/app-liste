import { useContext } from "react";
import { ListContext } from "../context/ListProvider";



export default function useList() {

    return useContext(ListContext)
    
}