"use client"

import { loadGrades } from '@/action/result.action';
import Link from 'next/link'
import { useEffect, useState } from 'react';

const Grade = () => {
  const [grade, setGrade] = useState<{ id: number; name: string; }[]>();

  useEffect(() => {
    const getGrades = async () => {
      try {
        const res = await loadGrades();
        if (res) {
          setGrade(res);
        } else {
          console.log("No grades found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getGrades();
  }, []);

  return (
    <div className="box-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {grade?.map((item) => (
          <Link href={`/grades/${item.id}`} className="card-box" key={item.id}>
            <h3 className="text-2xl text-white">{item.name}</h3>
            <span>Mathematics</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Grade