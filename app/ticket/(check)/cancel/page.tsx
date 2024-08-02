"use client"

import CancelRead from "@/components/templates/ticket/CancelRead";
import TicketStatus from "@/components/templates/ticket/TicketStatus";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const ReservationDetails = () => {
    const params = useSearchParams();
    const reservationId = params.get("reservation_id");
    const [dynamicHeightClass, setDynamicHeightClass] = useState("");
    const [buyer, setBuyer] = useState<string>("");
    const [phone_num, setPhoneNum] = useState<string>("");
    const [student_id, setStudentId] = useState<string>("");
    const [state, setState] = useState<any>(null);
    const [type, setType] = useState<string>("GENERAL");
    
    useEffect(() => {
        const updateHeightClass = () => {
            const screenHeight = window.screen.height;
            const adjustedHeight = screenHeight - 64; 
    
            setDynamicHeightClass(`h-[${adjustedHeight}px]`);
        };
    
        updateHeightClass();
        window.addEventListener("resize", updateHeightClass);
        return () => {
            window.removeEventListener("resize", updateHeightClass);
        };
        }, []); 

    return (
        <div className={`w-full pad:w-[786px] dt:w-[996px] flex flex-col relative mx-auto top-20 ${dynamicHeightClass}`}>
            <div className="relative w-full h-[200px] pad:rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 bg-ticket-complete bg-center bg-cover filter blur-[6px] z-[-1]"></div>
                <div className="relative flex h-full items-center justify-center pad:bg-gray-90 bg-opacity-60 rounded-t-xl">
                    <p className="h-12 text-gray-0 text-center text-2xl pad:text-[32px]  font-semibold leading-[48px]">예매가 취소되었습니다.</p>
                </div>
            </div>
            <div className="h-full w-full pad:rounded-b-xl pad:border pad:border-gray-15 flex flex-col mx-auto">
                <TicketStatus reservation_id={reservationId as string} buyer={buyer} phone_num={phone_num} student_id={student_id} state={state} type={type}  />
                <CancelRead/>
            </div>
            <Link href="/ticket/" className="mt-10 w-[384px] h-[59px] flex flex-shrink-0 text-center justify-center items-center mx-auto rounded-xl text-[18px] font-medium text-gray-60 bg-gray-5">예매 페이지로 돌아가기</Link>
        </div>
    );
};

export default ReservationDetails;
