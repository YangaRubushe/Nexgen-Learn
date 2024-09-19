'use client'
import React, { useEffect, useState } from "react"
import {db} from '../../../configs/db'; // assuming db is imported from a specific file
import { CourseList} from "../../../configs/schema"
import { eq } from 'drizzle-orm'; // assuming CourseList and eq are imported from the same file as db
import CourseBasicInfo from "../../create-course/[courseId]/_components/CourseBasicInfo"
import Header from "../../../app/_components/Header"
import CourseDetail from "../../create-course/[courseId]/_components/CourseDetail";
import ChapterList from "../../create-course/[courseId]/_components/ChapterList";

function Course({params}) {


    const [course,setCourse]=useState();
    useEffect(()=>{

        params&&GetCourse();
    }, [params])

    const GetCourse=async()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList?.courseId,params?.courseId))

        setCourse(result[0]);
        console.log(result);
    }

    return (
        <div>
            <Header />
            <div className='px-10 p-10 md:px-20 lg:px-44'>
            <CourseBasicInfo course={course} edit={false} />
            <CourseDetail course={course} />

            <ChapterList course={course} edit={false} />

            </div>
        </div>
    )
}

export default Course