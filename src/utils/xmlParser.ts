import {
  AssessmentCategories,
  AssessmentStatuses,
  GradingStatuses,
  IAssessment,
  IAssessmentOverview,
  IMCQQuestion,
  IProgrammingQuestion,
  IQuestion, 
  Library,
  MCQChoice
} from '../components/assessment/assessmentShape'
import {
  IXmlParseStrCProblem,
  IXmlParseStrOverview,
  IXmlParseStrPProblem,
  IXmlParseStrProblem,
  IXmlParseStrProblemChoice,
  IXmlParseStrTask
} from '../utils/xmlParseStrShapes'; 


const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const makeAssessmentOverview = (result: any) : IAssessmentOverview => {
  const task : IXmlParseStrTask = result.CONTENT.TASK[0];
  const rawOverview : IXmlParseStrOverview = task.$;
  return {
    category: capitalizeFirstLetter(rawOverview.kind) as AssessmentCategories,
    closeAt: rawOverview.duedate,
    coverImage: rawOverview.coverimage,
    grade: 1,
    id: 7,
    maxGrade: 3000,
    maxXp: 1000,
    openAt: rawOverview.startdate,
    title: rawOverview.title,
    shortSummary: task.WEBSUMMARY ? task.WEBSUMMARY[0] : '',
    status: AssessmentStatuses.attempting,
    story: rawOverview.story,
    xp: 0,
    gradingStatus: 'none' as GradingStatuses
  }
}

export const makeAssessment = (result: any) : IAssessment => {
  const task : IXmlParseStrTask = result.CONTENT.TASK[0];
  const rawOverview : IXmlParseStrOverview = task.$;
  return {
    category: capitalizeFirstLetter(rawOverview.kind) as AssessmentCategories,
    id: 7,
    longSummary: task.TEXT[0],
    missionPDF: 'google.com',
    questions: makeQuestions(task),
    title: rawOverview.title
  }
}

const altEval = (str: string) : any => {
    return Function('"use strict";return (' + str + ')')();
}

const makeLibrary = (task: IXmlParseStrTask) : Library => {
  const symbolsVal : string[]  = task.DEPLOYMENT[0].EXTERNAL[0].SYMBOL || [];
  const globalsVal = task.GLOBAL.map((x) => [x.IDENTIFIER[0], altEval(x.VALUE[0])]) as Array<[string, any]>;
  return {
    chapter: parseInt(task.DEPLOYMENT[0].$.interpreter, 10),
    external: {
      name: task.DEPLOYMENT[0].EXTERNAL[0].$.name,
      symbols: symbolsVal
    },
    globals: globalsVal,
  }
}

const makeQuestions = (task: IXmlParseStrTask) : IQuestion[] => {
  const questions: Array<IProgrammingQuestion | IMCQQuestion> = []
  task.PROBLEMS[0].PROBLEM.forEach((problem: IXmlParseStrProblem, curId: number) => {
    const question: IQuestion = {
      answer: null,
      comment: null,
      content: problem.TEXT[0],
      id: curId,
      library: makeLibrary(task),
      type: problem.$.type,
      grader: {
        name: 'fake person',
        id: 1
      },
      gradedAt: '2038-06-18T05:24:26.026Z',
      xp: 0,
      grade: 0,
      maxGrade: problem.$.maxgrade,
      maxXp: problem.$.maxxp
    }
    if (question.type === 'programming') {
      questions.push(makeProgramming(problem as IXmlParseStrPProblem, question))
    }
    if (question.type === 'mcq') {
      questions.push(makeMCQ(problem as IXmlParseStrCProblem, question));
    }
  })
  return questions
}

const makeMCQ = (problem: IXmlParseStrCProblem, question: IQuestion) : IMCQQuestion => {
  const choicesVal: MCQChoice[] = []
  let solutionVal = 0
  problem.CHOICE.forEach((choice: IXmlParseStrProblemChoice, i: number) => {
    choicesVal.push({
      content: choice.TEXT[0],
      hint: null
    })
    solutionVal = choice.$.correct === 'true' ? i : solutionVal
  })
  return {
    ...question,
    type: "mcq",
    answer: problem.SNIPPET[0].SOLUTION[0] as number,
    choices: choicesVal,
    solution: solutionVal
  }
}

const makeProgramming = (problem: IXmlParseStrPProblem, question: IQuestion): IProgrammingQuestion => {
  return {
    ...question,
    answer: problem.SNIPPET[0].TEMPLATE[0] as string,
    solutionTemplate: problem.SNIPPET[0].SOLUTION[0] as string,
    type: 'programming'
  }
}


export const assessmentToXml = (assessment: IAssessment, overview: IAssessmentOverview): IXmlParseStrTask => {
  const task: any = {};
  const rawOverview : IXmlParseStrOverview = {
    kind: overview.category.toLowerCase(),
    duedate: overview.closeAt,
    coverimage: overview.coverImage,
    startdate: overview.openAt,
    title: overview.title,
    story: overview.story
  };
  task.$ = rawOverview;

  task.WEBSUMMARY = [overview.shortSummary];
  task.TEXT = [assessment.longSummary];
  task.PROBLEMS = [];

  assessment.questions.forEach((question: IProgrammingQuestion | IMCQQuestion) => {
    const problem = {
      $: {
        type: question.type,
        maxgrade: question.maxGrade,
        maxxp: question.maxXp
      },
      SNIPPET: [
        {
          SOLUTION: [question.answer],
          TEMPLATE: [question.answer]
        }
      ],
      TEXT: [question.content],
      CHOICE: [] as any[],
    }

    if (question.type === 'programming') {
      problem.SNIPPET[0].TEMPLATE[0] = question.solutionTemplate;
    }

    if (question.type === 'mcq') {
      problem.SNIPPET[0].SOLUTION[0] = question.answer;
      question.choices.forEach((choice: MCQChoice, i: number) => {
        problem.CHOICE.push({
          $: {
            correct: (question.solution === i) ? 'true' : 'false',
          },
          TEXT: [choice.content],
        })
      })
    }

    task.PROBLEMS.push(problem);
  });
  return task;
}
