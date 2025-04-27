import dedent from 'dedent';

const PROMPT = {
  IDEA: dedent`:As your are coach
    - User want to learn about the topic
    - Generate 5-7 Course title (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,
    `,
  // - Chapter Explain in HTML Form, (Code example if required), add line break if required
  COURSE: dedent`: As you are coach
    - User want to learn about all topics
    - Create a Course With Course Name, Description, and Chapters
    - Make sure to add chapters
    - Do not Just Explain what chapter about, Explain in Detail with Example
    - Add CourseBanner Image from ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), select It randomly
    - Explain the chapter content as detailed tutorial
    - Tag each course to one of the categorty from :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
    - Output in JSON Format only 
    -  
  {
    "courseName": '<Course Name ex.(Intro to Python)>',
    "description": '',
    "banner_image": <randomly selected on of this values ['/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png']>,
    "category":'<select on of this values ["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"] accorfing to course theme>',
    "chapters": [ 
          {
            topic: '<Topic Name in 2 to 4 worlds ex.(Creating Variables)>'
            explain: '< Detailed Explaination in 5 to 8 Lines if required>',
            code: '<Code example if required else null>',
            example: '< example of required else null'
          },

          ... ADD 6 MORE CHAPTERS
      
    ],
  }
    `
};

export default PROMPT;
