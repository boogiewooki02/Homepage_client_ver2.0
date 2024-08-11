"use client"
import FinalStep from "@/components/templates/ticket/FinalStep";
import FreshmanInfo from "@/components/templates/ticket/FreshmanInfo";
import MemberSelection from "@/components/templates/ticket/MemberSelection";
import PartySelection, { State, reducer } from "@/components/templates/ticket/PartySelection";
import TicketSelection from "@/components/templates/ticket/TicketSelection";
import Bar from "@/components/ui/Bar";
import {useState, useReducer, useEffect} from "react";
import { useRouter } from "next/navigation";
import Warning from "@/components/templates/ticket/Warning";
import { axiosInstance } from "@/api/auth/axios";
import { information } from "@/components/data/Information";

const initialState: State = {
    participation1: false,
    participation2: false,
    notParticipation: false,
};

const handleMeeting = (state: State): string => {
    if (state.notParticipation) return 'NOT_ATTEND';
    if (state.participation1 && state.participation2) return 'BOTH_ATTEND';
    if (state.participation1) return 'DAY1_ATTEND';
    if (state.participation2) return 'DAY2_ATTEND';
    return 'NOT_ATTEND';
};

const Freshman_ticket: React.FC = () => {
    const router = useRouter();
    const [member, setMember] = useState<number>(1);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isAlreadyReserved, setIsAlreadyReserved] = useState(false);
    const [showLastCheckModal, setShowLastCheckModal] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        department: '',
        studentId: '',
        phone_num: '',
        type: 'FRESHMAN',
    });

    const handleUserInfoChange = (info: { name: string, department: string, studentId: string, phone_num: string }) => {
        setUserInfo(prevState => ({
            ...prevState,
            ...info
        }));
    };


    const [partySelection, dispatchPartySelection] = useReducer(reducer, initialState);

    const handleReservationComplete = () => {
        router.push('/ticket/complete');
    };

    const handleAlreadyReserved = () => {
        router.push('/ticket/search');
    };

    useEffect(() => {
        const { name, phone_num, department, studentId } = userInfo;
        const areUserInfoComplete =
        name.trim() !== "" &&
        phone_num.trim() !== "" &&
        department.trim() !== "" &&
        studentId.trim() !== "";

        const isParticipationValid =
            partySelection.notParticipation ||
            partySelection.participation1 ||
            partySelection.participation2;

        const isDataComplete = areUserInfoComplete && isParticipationValid;
        setIsFormComplete(isDataComplete);
    }, [userInfo, partySelection]);

    const handleSubmit = async () => {
        const { name, phone_num, department, studentId, type } = userInfo;
        const meeting = handleMeeting(partySelection);
        const isDataComplete = isFormComplete;
        console.log(name, phone_num, department, studentId, type, meeting);
        if (isDataComplete) {
            try {
                const formData = { 
                    buyer: name, 
                    phone_num, 
                    type, 
                    major: department, 
                    studentId, 
                    meeting,
                    members: []
                };
                const response = await axiosInstance.post(
                    `/tickets`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log(formData);

                if (response.status === 200) {
                    const reservationId = response.data.result.reservationId;
                    router.push(`/ticket/complete?reservationId=${reservationId}`);
                }else if(response.data.code === "ALREADY EXIST STUDENT_ID"){
                    setIsAlreadyReserved(true);
                    setShowLastCheckModal(false);
                }else {
                    console.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    return (
    <div className="h-[1850px] w-full pad:w-[786px] dt:w-[996px] flex flex-col relative mx-auto top-20">
        <div className="h-[200px] w-full pad:rounded-t-xl bg-gray-90 flex flex-col mx-auto">
            <p className="mt-10 text-gray-0 text-center text-2xl pad:text-[32px]  font-semibold leading-[48px]">신입생 티켓 예매</p>
            <p className="mt-4 text-gray-20 text-center text-base pad:text-lg  font-normal leading-[27px]">{information.title}</p>
            <p className="mt-1 text-gray-20 text-center text-base pad:text-lg  font-normal leading-[27px]">{information.subDate}</p>
        </div>
        <div className="h-[1395px] w-full pad:rounded-b-xl pad:border pad:border-gray-15 flex flex-col mx-auto gap-0">
            <div className="flex flex-col">
                <MemberSelection description="신입생은 최대 1인 1매 구매 가능합니다." min={1} max={1} ticket={"freshman"}  member={member} setMember={setMember}/>
                <Bar className="px-4 pad:px-12"/>
                <FreshmanInfo userInfo={userInfo} onInfoChange={handleUserInfoChange}/>
                <Bar className="px-4 pad:px-12"/>
                <TicketSelection/>
                <Bar className="px-4 pad:px-12"/>
                <PartySelection dispatch={dispatchPartySelection} state={partySelection} />
                <Bar className="hidden pad:flex px-4 pad:px-12"/>
                <Warning/>
            </div>
            <FinalStep price={0} amount={1} handleSubmit={handleSubmit} onReservationComplete={handleReservationComplete} isFormComplete={isFormComplete} onAlreadyReserved={handleAlreadyReserved} isAlreadyReserved = {isAlreadyReserved}
                setShowLastCheckModal={setShowLastCheckModal} showLastCheckModal = {showLastCheckModal} />
        </div>
    </div>
    );
};

export default Freshman_ticket;