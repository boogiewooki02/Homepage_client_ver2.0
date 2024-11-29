import { AnnouncementBanner } from '@/components/announcement/list/AnnouncementBanner';
import List from '@/components/announcement/list/List';

const page = () => {
  return (
    <div className="font-pretendard w-full flex-col">
      <AnnouncementBanner />
      <List />
    </div>
  );
};

export default page;
