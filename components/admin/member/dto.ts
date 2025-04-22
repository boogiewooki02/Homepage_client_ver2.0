export interface Member {
  id: number;
  userType: string;
  term: number;
  name: string;
  session: string;
  loginType: string;
  approvalStatus: 'APPROVED' | 'WAITING';
}
