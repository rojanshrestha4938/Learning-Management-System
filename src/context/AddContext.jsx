 
import { dummyCourses } from "../assets/assets"
import { AppContext } from "./AppContext"
import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import humanizeDuration from "humanize-duration"

export const AppContextProvider = (props)=>{

    const currency = import.meta.env.VITE_CURRENCY || '$'
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = React.useState([])
    const [isEducator, setIsEducator] = React.useState(true)
    const [enrolledCourses, setEnrolledCourses] = React.useState([])

    //Fetch all courses
 useEffect(() => {
  const fetchAllCourses = async () => {
    // simulate API
    setAllCourses(dummyCourses);
  };

  fetchAllCourses();
}, []);

//Function to calculate average rating of a course
const calculateRating=(course)=>{
    if(!course || !course.courseRatings || !Array.isArray(course.courseRatings) || course.courseRatings.length===0){
        return 0;
    }
    let totalRating=0
    course.courseRatings.forEach(rating=>{
        totalRating+=rating.rating
    })
    return totalRating/course.courseRatings.length;
}

//Function to calculate coures chapter time
const calculateChapterTime=(chapter)=>{
    let time=0;
    if (chapter && chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
        chapter.chapterContent.forEach((lecture)=>{
            time+=lecture.lectureDuration
        })
    }
    return humanizeDuration(time*60*1000, {units: ['h', 'm'], round: true})
}

//Functions to calculate course duration
const calculateCourseDuration = (course) => {
  let time = 0;

  if (course && course.courseContent && Array.isArray(course.courseContent)) {
    course.courseContent.forEach((chapter) => {
      if (chapter && chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
        chapter.chapterContent.forEach((lecture) => {
          if (lecture && lecture.lectureDuration) {
            time += lecture.lectureDuration; // in minutes
          }
        });
      }
    });
  }

  return humanizeDuration(time * 60 * 1000, {
    units: ['h', 'm'],
    round: true,
  });
};

//Function to calculate no of lectures in a course
const calculateNoofLectures=(course)=>{
    let totalLectures=0;
    if (course && course.courseContent && Array.isArray(course.courseContent)) {
        course.courseContent.forEach(chapter=>{
            if(chapter && Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            }
        });
    }
    return totalLectures;
}

//Fetch user enrolled courses
useEffect(() => {
  const fetchUserEnrolledCourses = async () => {
    // simulate API
    setEnrolledCourses(dummyCourses);
  };

  fetchUserEnrolledCourses();
}, []);


    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, 
        setIsEducator, calculateChapterTime, calculateCourseDuration, calculateNoofLectures,
        enrolledCourses,
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}