/* eslint-disable no-constant-condition */
import React, { useContext, useState, useMemo } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  
  // Derive courseData from enrolledCourses and courseId
  const courseData = useMemo(() => {
    if (enrolledCourses && enrolledCourses.length > 0 && courseId) {
      return enrolledCourses.find((course) => course._id === courseId) || null
    }
    return null
  }, [enrolledCourses, courseId])

  // Debug logging (remove in production)
  React.useEffect(() => {
    console.log('Player Debug:', {
      courseId,
      enrolledCoursesLength: enrolledCourses?.length,
      courseData: courseData ? courseData.courseTitle : 'Not found'
    })
  }, [courseId, enrolledCourses, courseData])

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    })
    );
  };
  // Show loading state if enrolledCourses is not yet loaded
  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className='p-4 sm:p-10 md:px-36 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-500 text-lg'>Loading course data...</p>
        </div>
      </div>
    )
  }

  // Show error if course not found
  if (!courseData) {
    return (
      <div className='p-4 sm:p-10 md:px-36 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Course Not Found</h2>
          <p className='text-gray-500 mb-4'>The course you're looking for doesn't exist or you're not enrolled.</p>
          <p className='text-sm text-gray-400'>Course ID: {courseId}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        <div className='text-gray-800'>
          <h1 className='text-2xl font-bold mb-4'>{courseData.courseTitle}</h1>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData && courseData.courseContent && Array.isArray(courseData.courseContent) && courseData.courseContent.length > 0 ? (
              courseData.courseContent.map((chapter, index) => (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                        src={assets.down_arrow_icon} alt="arrow_icon" />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>{chapter.chapterContent && Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0} lectures-{calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent && Array.isArray(chapter.chapterContent) ? chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play_icon" className='w-4 h-4 mt-1' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && <p onClick={() => setPlayerData({
                              ...lecture, chapter: index + 1, lecture: i + 1
                            })}
                              className='text-blue-500 cursor-pointer'>Watch</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                      )) : null}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500 py-4'>No course content available.</p>
            )}
          </div>
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course:</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName='w-full aspect-video' />
              <div className='flex justify-between items-center mt-1'>
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className='text-blue-600'>{false ? 'Completed':'Mark Complete'}</button>
              </div>
            </div>
          ) : (
            courseData && courseData.courseThumbnail ? (
              <img src={courseData.courseThumbnail} alt={courseData.courseTitle || 'Course thumbnail'} className='w-full' />
            ) : (
              <div className='w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500'>
                <p>No thumbnail available</p>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Player