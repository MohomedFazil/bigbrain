"use server";

import { prisma } from "@/lib/prisma";

export async function loadGrades() {
  try {
    const res = await prisma.grade.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    if (res) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in loadGrades", error);
    return null;
  }
}

export async function loadPapers() {
  try {
    const res = await prisma.paper.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    if (res) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in loadPapers", error);
    return null;
  }
}

export async function loadStudents() {
  try {
    const rankedStudents = await prisma.student.findMany({
      include: {
        marks: true,
      },
    });
    return rankedStudents
  } catch (error) {
    console.log("Error in loadStudents", error);
    return null;
  }
}

export async function loadData(id: string) {
  try {
    const res = await prisma.mark.findMany({
      where: {
        gradeId: parseInt(id)
      },
      include: {
        students: true,
        subjects: true,
        papers: true,
      },
      orderBy: {
        score: "desc"
      }
    })

    if (res) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in loadData", error);
    return null;
  }
}

// export async function addDatabase() {
//   try {
//     const res = await prisma.mark.create({
//       data: {
//         studentId: 5,
//         gradeId: 7,
//         subjectId: 1,
//         paperId: 2,
//         score: 13
//       }
//     })

//     // const res = await prisma.grade.deleteMany();

//     if (res) {
//       console.log("Added successfully", res);
//     }
//   } catch (error) {
//     console.log("Error in addDatabase", error);
//   }
// }