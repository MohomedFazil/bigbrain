"use server";

import { prisma } from "@/lib/prisma";

export async function loadGrades() {
  try {
    const res = await prisma.grade.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    return res;
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