"use client"

import { loadData, loadPapers, loadStudents } from '@/action/result.action';
import { prisma } from '@/lib/prisma';
import Image from 'next/image'
import { useEffect, useState } from 'react';

const GradeDetail = ({ id }: { id: string }) => {
  // expected result shape from loadData
  type ResultItem = {
    id: number;
    gradeId: number;
    studentId: number;
    subjectId: number;
    paperId: number;
    score: number | null;
    students: { id: number; gradeId: number; name: string; };
    subjects: { id: number; name: string; };
    papers: { id: number; name: string; };
  };

  const [data, setData] = useState<ResultItem[] | undefined>(undefined);
  const [papers, setPapers] = useState<{ id: number; name: string; }[]>();
  const [rank, setRank] = useState<{ studentId: number; name: string; totalScore: number; }[]>([]);

  async function calculateRanks() {
    try {
      const rankedStudents = await loadStudents();
      if (!rankedStudents) return;

      const rankings = rankedStudents
        .map((student) => ({
          studentId: student.id,
          name: student.name,
          totalScore: student.marks.reduce((sum, r) => sum + (r.score ?? 0), 0),
        }))
        .sort((a, b) => b.totalScore - a.totalScore) // highest score first
        .slice(0, 3); // top 3

      setRank(rankings);
      console.log("Calculated rankings:", rankings);
    } catch (error) {
      console.log("Error in calculate ranks", error);
    }
  }

  async function fetchPapers() {
    try {
      const res = await loadPapers();
      if (res) {
        setPapers(res);
      } else {
        console.log("No papers found")
      }
    } catch (error) {
      console.log("Error in fetch papers", error);
    }
  }

  useEffect(() => {
    let mounted = true;
    const fetchAllData = async () => {
      try {
        await calculateRanks();
        await fetchPapers();
        const res = await loadData(id);
        if (!mounted) return;
        if (res) {
          setData(res);
        } else {
          console.log("No data found");
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    fetchAllData();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="box-container">
      <h2 className="text-2xl font-bold">MATHEMATICS TOP RANKERS</h2>

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="py-12 px-6 gif-bg rounded-2xl bg gold-box border border-b-8 relative">
            <Image
              src="/first-place.png"
              alt="Gold Background"
              width={100}
              height={120}
              className="absolute -rotate-12 -top-5 left-0"
            />
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-8">
                <div className='flex items-center justify-center'>
                  <Image
                    src="/person.png"
                    alt="Top Ranker"
                    width={80}
                    height={80}
                    className="w-auto"
                  />
                  <Image
                    src="/gold_frame.png"
                    alt="Gold Frame"
                    width={150}
                    height={150}
                    className="absolute"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 uppercase text-gold-100">{rank[0]?.name}</h3>
                  <span className="text-5xl font-bold text-white">{rank[0]?.totalScore}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-12 px-6 rounded-2xl bg silver-box border border-b-8 relative">
            <Image
              src="/second-place.png"
              alt="Gold Background"
              width={100}
              height={120}
              className="absolute -rotate-12 -top-5 left-0"
            />
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-8">
                <div className='flex items-center justify-center'>
                  <Image
                    src="/person.png"
                    alt="Top Ranker"
                    width={80}
                    height={80}
                    className="w-auto"
                  />
                  <Image
                    src="/silver_frame.png"
                    alt="Silver Frame"
                    width={180}
                    height={180}
                    className="absolute"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 uppercase">{rank[1]?.name}</h3>
                  <span className="text-5xl font-bold text-white">{rank[1]?.totalScore}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-12 px-6 rounded-2xl bg bronze-box border border-b-8 relative">
            <Image
              src="/third-place.png"
              alt="Gold Background"
              width={100}
              height={120}
              className="absolute -rotate-12 -top-5 left-0"
            />
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center gap-3">
                <div className=' flex items-center justify-center'>
                  <Image
                    src="/person.png"
                    alt="Top Ranker"
                    width={80}
                    height={80}
                    className="w-auto"
                  />
                  <Image
                    src="/lead_frame.png"
                    alt="Lead Frame"
                    width={120}
                    height={120}
                    className="absolute"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 uppercase">{rank[2]?.name}</h3>
                  <span className="text-5xl font-bold text-white">{rank[2]?.totalScore}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-24 grid grid-cols-1 gap-6">

          {papers?.map((paper) => (
            <div className="flex flex-col gap-4" key={paper.id}>
              <h3 className="text-2xl">{paper.name}</h3>
              <table className="border border-b-4">
                <thead className="py-4 border-b">
                  <tr className="text-center bg-white">
                    <th className="py-4">ID</th>
                    <th className="py-4">Name</th>
                    <th className="py-4">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.filter(item => item.paperId === paper.id).map((item, i) => (
                    <tr className="text-center border-b" key={item.id}>
                      <td className="py-4">{i + 1}</td>
                      <td className="py-4">{item.students.name}</td>
                      <td className="py-4 font-bold">{item.score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default GradeDetail