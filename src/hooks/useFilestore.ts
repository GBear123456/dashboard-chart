import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

// get record...
const UseFirestore = async (collection:string) => {
  const docs:any[] = [];
  console.log('firebaseStart');

  async function unsub() {
    const dbref = projectFirestore
    .collection(collection);
    try {
      const snapshots = await dbref.get();
      snapshots.forEach((doc) => {
        docs.push(doc.data()); 
      });
    } catch (err)
    {
      console.log(err);
    }
  }
  await unsub();
  console.log("GBear: query result:", docs);

  return { docs };
};

interface Provider {
  quality: string,
  status: string
}

export const UseGetFireStore = async (collection: string, query: Provider) => {
  const docs:any[] = [];
  let quality = "all";
  if (query.quality === "low") {
      quality = "Low";
  } else if (query.quality === "high") {
      quality = "High";
  }
  let status = 0;
  if (query.status === "fulfilled") {
      status = 1;
  } else if (query.status === "unfulfilled") {
      status = 2;
  }

  console.log("GBear: query:", query, quality, status);
  async function unsub() {
    const dbref = projectFirestore
    .collection(collection).orderBy("year", "asc");
    try {
      const snapshots = await dbref.get();
      snapshots.forEach((doc) => {
        //console.log("GBear: query doc:", doc.get("status"), doc.get("quality"));
        if(quality === "all")
        {
          if (status === 0)
          {
            docs.push(doc.data()); 
          } 
          else if (doc.get("status") === status) 
          {
            docs.push(doc.data()); 
          }
        }
        else if (status === 0)
        {
          if (quality === "all")
          {
            docs.push(doc.data()); 
          } 
          else if (doc.get("quality")  === quality) {
            docs.push(doc.data()); 
          }
        }
        else if (doc.get("quality")  === quality && doc.get("status")  === status) 
        {
          docs.push(doc.data()); 
        }
      });
    } catch (err)
    {
      console.log(err);
    }
  }
  await unsub();
  console.log("GBear: query result:", docs);

  return {docs};
};

export default UseFirestore;