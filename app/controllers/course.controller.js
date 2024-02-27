const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    try {
        const { course_name, course_description, course_visibility,  instructor } = req.body;
        
        if(!course_name || !course_description || !course_visibility || !instructor){
            return res.status(400).send({
                message: "Please fill all the fields!",
                code: 400
            });
        }
        

        const existingCourse = await prisma.course.findFirst({
            where: {
                course_name: course_name
            }
        });

        if (existingCourse) {
            return res.status(403).send({
                message: "Course with the same name already exists!",
                code: 403
            });
        }
    
        const createCourse = await prisma.course.create({
            data: {
                course_name: course_name,
                course_description: course_description,
                course_visibility: course_visibility,
                instructor: instructor,
            }

        });

        res.status(200).send({
            message: "Course was created successfully!",
            code: 200
        });

    } catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
};

exports.course_lesson = async (req, res) => {
    try {
        const lesson_name = req.body.lesson_name;
        const course_id = req.body.course_id;

        if (!lesson_name || !course_id) {
            return res.status(400).send({
                message: "Lesson Name and Course ID are required!",
                code: 400
            });
        }


        const existingCourse = await prisma.course.findFirst({
            where: {
                course_id: course_id
            }
        });

        if (!existingCourse) {
            return res.status(404).send({
                message: "Course is not found!",
                code: 404
            });
        }
        const createLesson = await prisma.course_lesson.create({
            data: {
                lesson_name: lesson_name,
                course_id: course_id
            }
        });

        res.status(200).send({
            message: "Lesson was created successfully!",
            code: 200
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}

exports.course_lesson_content = async (req, res) => {
    try {
        const lesson_id = req.body.lesson_id;
        const content_data = req.body.content_data;
        const content_type = req.body.content_type;

        if (!lesson_id || !content_data || !content_type) {
            return res.status(400).send({
                message: "Lesson ID, Content Data, and Content Type are required!",
                code: 400
            });
        }


        const existingLesson = await prisma.course_lesson.findFirst({
            where: {
                lesson_id: lesson_id
            }
        });
        if (!existingLesson) {
            return res.status(404).send({
                message: "Lesson is not found!",
                code: 404
            });
        }
        const createContent = await prisma.lesson_chapter.create({
            data: {
                lesson_id: lesson_id,
                content_data: content_data,
                content_type: content_type
            }
        });

        res.status(200).send({
            message: "Content was created successfully!",
            code: 200
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}

exports.get_course = async (req, res) => {
    try {
        const course = await prisma.course.findMany({
            include: {
                course_lesson: {
                    select: {
                        lesson_name: true,
                    }
                },
                users_account: {
                    select: {
                        prefix: true,
                        first_name: true,
                        last_name: true,

                    }
                }
            }
        });
        if(!course){
            return res.status(404).send([]);

        }

        res.status(200).send(course);
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}





exports.update_course = async (req, res) => {
    try{
          const course_id = req.body.course_id;
            const course_name = req.body.course_name;
            const course_description = req.body.course_description;
            const course_visibility = req.body.course_visibility;

            if (!course_id || !course_name || !course_description || !course_visibility) {
                return res.status(400).send({
                    message: "Course ID, Course Name, Course Description, and Course Visibility are required!",
                    code: 400
                });
            }

            const existingCourse = await prisma.course.findFirst({
                where: {
                    course_id: course_id
                }
            });
        
            if (!existingCourse) {
                return res.status(404).send({
                    message: "Course is not found!",
                    code: 404
                });
            }

            const updateCourse = await prisma.course.update({
                where: {
                    course_id: course_id
                },
                data: {
                    course_name: course_name,
                    course_description: course_description,
                    course_visibility: course_visibility,
                }
            });

            res.status(200).send({
                message: "Course was updated successfully!",
                code: 200
            });
    } catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }   
}

exports.update_lesson = async (req, res) => {
    try{
        const lesson_id = req.body.lesson_id;
        const lesson_name = req.body.lesson_name;

        if (!lesson_id || !lesson_name) {
            return res.status(400).send({
                message: "Lesson ID and Lesson Name are required!",
                code: 400
            });
        }


        const existingLesson = await prisma.course_lesson.findFirst({
            where: {
                lesson_id: lesson_id
            }
        });

        if (!existingLesson) {
            return res.status(404).send({
                message: "Lesson is not found!",
                code: 404
            });
        }

        const updateLesson = await prisma.course_lesson.update({
            where: {
                lesson_id: lesson_id
            },
            data: {
                lesson_name: lesson_name,
            }
        });

        res.status(200).send({
            message: "Lesson was updated successfully!",
            code: 200
        });

    } catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}

exports.update_content = async (req, res) => {
    try{
        const lesson_chapter_id = req.body.lesson_chapter_id;
        const content_data = req.body.content_data;
        const content_type = req.body.content_type;


        if (!lesson_chapter_id || !content_data || !content_type) {
            return res.status(400).send({
                message: "Lesson Chapter ID, Content Data, and Content Type are required!",
                code: 400
            });
        }
        

        const existingContent = await prisma.lesson_chapter.findFirst({
            where: {
                lesson_chapter_id: lesson_chapter_id
            }
        });

        if (!existingContent) {
            return res.status(404).send({
                message: "Content is not found!",
                code: 404
            });
        }

        const updateContent = await prisma.lesson_chapter.update({
            where: {
                lesson_chapter_id: lesson_chapter_id
            },
            data: {
                content_data: content_data,
                content_type: content_type
            }
        });

        res.status(200).send({
            message: "Content was updated successfully!",
            code: 200
        });

    } catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}


exports.delete_course_lesson  = async (req, res) => {
    try{

        const lesson_id = parseInt(req.params.id); 


const existingLesson = await prisma.course_lesson.findFirst({
    where: {
        lesson_id: lesson_id 
    }
    });

    if (!existingLesson) {
        return res.status(404).send({
            message: "Lesson is not found!",
            code: 404
        });
    }

    const deleteLesson = await prisma.course_lesson.delete({
        where: {
            lesson_id: lesson_id
        }
    });

    res.status(200).send({
        message: "Lesson was deleted successfully!",
        code: 200
    });
} catch (err) {
    res.status(500).send({
        message: err.message,
        code: 500
    });
}
}



exports.delete_content  = async (req, res) => {
    try{

        const lesson_chapter_id = parseInt(req.params.id);

        const existingContent = await prisma.lesson_chapter.findFirst({
            where: {
                lesson_chapter_id: lesson_chapter_id
            }
        });

        if (!existingContent) {
            return res.status(404).send({
                message: "Content is not found!",
                code: 404
            });
        }
        const deleteContent = await prisma.lesson_chapter.delete({
            where: {
                lesson_chapter_id: lesson_chapter_id
            }
        });

        res.status(200).send({
            message: "Content was deleted successfully!",
            code: 200
        });

    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}


exports.get_course_by_id = async (req, res) => {
    try {
        const course_id = parseInt(req.params.id);

        const course = await prisma.course.findFirst({
            where: {
                course_id: course_id
            },
            select: {
                course_id: true,
                course_name: true,
                course_description: true,
                course_visibility: true,
                course_lesson: {
                    select: {
                        lesson_name : true,
                        lesson_id : true,
                    }
                }
            }
        });
        
        if(!course){
            return res.status(404).send({
                message: "Course is not found!",
                code: 404
            });
        }

        res.status(200).send(course);
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}

exports.get_course_by_id = async (req, res) => {
    try {
        const course_id = parseInt(req.params.id);

        const course = await prisma.course.findFirst({
            where: {
                course_id: course_id
            },
            select: {
                course_id: true,
                course_name: true,
                course_description: true,
                course_visibility: true,
                course_lesson: {
                    select: {
                        lesson_name : true,
                        lesson_id : true,
                    }
                }
            }
        });
        
        if(!course){
            return res.status(404).send({
                message: "Course is not found!",
                code: 404
            });
        }

        res.status(200).send(course);
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}



exports.regis_course = async (req, res) => {
    try {
        const course_id = req.body.course_id
        const user_id = req.body.user_id
         

        if (!course_id || !user_id) {   
            return res.status(400).send({
                message: "Course ID and User ID are required!",
                code: 400
            });
        }

        const check_users_account = await prisma.users_account.findFirst({
            where: {
                user_id: user_id
            }
        });

        if (!check_users_account) {
            return res.status(404).send({
                message: "User is not found!",
                code: 404
            });
        }
        
        if(check_users_account.permission_id == 2 || check_users_account.permission_id == 3){
            return res.status(403).send({
                message: "You are not allowed to register this course!",
                code: 403
            });
        }

        const checkcourse = await prisma.course.findFirst({
            where: {
                course_id: course_id
            }
        });
    

        if (!checkcourse) {
            return res.status(404).send({
                message: "Course is not found!",
                code: 404
            });
        }

        const checkcourse_reg = await prisma.course_reg.findFirst({
            where: {
                course_id: course_id,
                user_id: user_id
            }
        });

        if (checkcourse_reg) {
            return res.status(403).send({
                message: "You have already registered this course!",
                code: 403
            });
        }
    
        if(checkcourse.course_visibility == false){
            const createCoursefree = await prisma.course_reg.create({
                data:{
                    course_id:course_id,
                    user_id:user_id,
                    registration_status:1,
                    completion_status:1
                }
            })
            return res.status(200).send({
                message: "Course was registered successfully!",
                status_registration :true,
                code: 200
            });

        }else{
            const createCourse = await prisma.course_reg.create({
                data:{
                    course_id:course_id,
                    user_id:user_id,
                    registration_status:1,
                    completion_status:0
                }
            })
            return res.status(200).send({
                message: "Course was registered successfully!",
                status_registration :false,
                code: 200
            });

      
         

        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
            code: 500
        });
    }
}

exports.get_course_by_instructor = async (req, res) => {
    try{  
        const user_id = req.user_id;
        

        const users = await prisma.users_account.findFirst({
            where:{
                user_id:user_id
            }
        });

        if(users.permission_id == 1){
            const course = await prisma.course.findFirst({
            where: {
                instructor: user_id
            },
            select: {
                course_id: true,
                course_name: true,
                course_description: true,
                course_visibility: true,
                course_lesson: {
                    select: {
                        lesson_name : true,
                        lesson_id : true,
                    }
                }
            }
        });

        if(!course){
            return res.status(200).send([]);
        }
        res.status(200).send(course);

        }else if(users.permission_id == 2){
            const course = await prisma.course.findMany({
                where: {
                    instructor: user_id
                },
                select: {
                    course_id: true,
                    course_name: true,
                    course_description: true,
                    course_visibility: true,
                    course_lesson: {
                        select: {
                            lesson_name : true,
                            lesson_id : true,
                        }
                    },
                    users_account: {
                        select: {
                            prefix: true,
                            first_name: true,
                            last_name: true,
                        }
                    }
                
                }
            });

            if(!course){
                return res.status(200).send([]);
            }
            res.status(200).send(course);
        }else{
            return res.status(200).send([]); 
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            code: 500
        });
    }
}

   


