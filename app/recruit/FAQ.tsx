'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as React from 'react';

const FAQ = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    <div className="bg-gradient-to-b from-gray-5 to-primary-0 flex flex-col justify-center items-center text-center h-auto -mb-40 pt-40 pb-[324px]">
      <div>
        <p className="text-gray-90 text-[24px] pad:text-[32px] font-semibold">
          자주 묻는 질문
        </p>
        <p className="text-primary-40 text-[18px] font-semibold mt-1">FAQ</p>
      </div>
      <div className="pt-16 flex flex-col items-start">
        <Accordion
          square
          disableGutters
          sx={{
            borderRadius: '16px',
            marginBottom: 4,
            padding: 0,
            boxShadow: 0,
            border: 0,
            '&:before': {
              display: 'none',
            },
          }}
          expanded={expanded === 'panel1'}
          onChange={() => {
            handleChange('panel1');
          }}
          className={`w-[328px] pad:w-[792px] ${expanded === 'panel1' ? 'bg-primary-50' : 'bg-gray-0'}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1"
            id="panel1-header"
            className={`p-8 text-[16px] pad:text-[18px] font-medium text-left ${expanded === 'panel1' ? 'text-gray-0 pb-4' : 'text-gray-80'}`}
          >
            <p
              className={`pr-2 ${expanded === 'panel1' ? 'text-gray-0' : 'text-primary-50'}`}
            >
              Q.
            </p>
            <p>
              다룰 줄 아는 악기가 없지만 깔루아에 들어가고 싶어요. 이런 제가
              깔루아에 지원해도 될까요?
            </p>
          </AccordionSummary>
          <AccordionDetails
            className="text-primary-10 text-[16px] pad:text-[18px] font-medium text-left flex flex-row px-8 pb-8"
            sx={{
              pt: 0,
              marginTop: 0,
            }}
          >
            <p className="pr-2">A.</p>
            <p>
              저는 드럼이라는 걸 대학 와서 처음 만져봤는데요. 선배들, 동기들이
              붙잡고 가르쳐줘서 이제 혼자서도 척척 합주 연습을 할 수 있답니다!
              선배들이 처음부터 친절하게 가르쳐주니 전혀 걱정 마세요! 악기를 안
              다뤄본 동기들도 많아요!
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          disableGutters
          sx={{
            borderRadius: '16px',
            marginBottom: 4,
            padding: 0,
            boxShadow: 0,
            border: 0,
            '&:before': {
              display: 'none',
            },
          }}
          expanded={expanded === 'panel2'}
          onChange={() => {
            handleChange('panel2');
          }}
          className={`w-[328px] pad:w-[792px]  ${expanded === 'panel2' ? 'bg-primary-50' : 'bg-gray-0'}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2"
            id="panel1-header"
            className={`p-8 text-[16px] pad:text-[18px] font-medium text-left ${expanded === 'panel2' ? 'text-gray-0 pb-4' : 'text-gray-80'}`}
          >
            <p
              className={`pr-2 ${expanded === 'panel2' ? 'text-gray-0' : 'text-primary-50'}`}
            >
              Q.
            </p>
            <p>
              저는 자율전공인데 컴퓨터공학과 소속 동아리인 깔루아에 들어갈 수
              있나요?
            </p>
          </AccordionSummary>
          <AccordionDetails className="text-primary-10 text-[16px] pad:text-[18px] font-medium text-left flex flex-row px-8 pb-8">
            <p className="pr-2">A.</p>
            <p>
              네! 저도 자율전공이랍니다. “컴퓨터 공학과에 진입할 예정” 이라면
              전혀 상관 없어요!
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          disableGutters
          sx={{
            borderRadius: '16px',
            marginBottom: 4,
            padding: 0,
            boxShadow: 0,
            border: 0,
            '&:before': {
              display: 'none',
            },
          }}
          expanded={expanded === 'panel3'}
          onChange={() => {
            handleChange('panel3');
          }}
          className={`w-[328px] pad:w-[792px] ${expanded === 'panel3' ? 'bg-primary-50' : 'bg-gray-0'}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3"
            id="panel1-header"
            className={`p-8 text-[16px] pad:text-[18px] font-medium text-left ${expanded === 'panel3' ? 'text-gray-0 pb-4' : 'text-gray-80'}`}
          >
            <p
              className={`pr-2 ${expanded === 'panel3' ? 'text-gray-0' : 'text-primary-50'}`}
            >
              Q.
            </p>
            <p>모집인원은 몇 명인가요?</p>
          </AccordionSummary>
          <AccordionDetails className="text-primary-10 text-[16px] pad:text-[18px] font-medium text-left flex flex-row px-8 pb-8">
            <p className="pr-2">A.</p>
            <p>
              보컬 2명, 드럼 2명, 기타 4명, 베이스 2명, 신디사이저 2명으로 총
              12명을 모집하고 있습니다.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
