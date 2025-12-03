import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';

import { InputFieldType } from '@/components/ui/admin/type';

export default function Date({
  field,
  value,
  onChange,
}: {
  field: InputFieldType;
  value: any;
  onChange: (newValue: any, label: string) => void;
}) {
  const { label } = field;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(value)}
        defaultValue={dayjs(value)}
        onChange={(newValue) => onChange(newValue, label)}
        format="YYYY-MM-DD"
        sx={{
          width: '100%',
          '& .MuiInputBase-root': {
            borderRadius: '12px',
          },
        }}
      />
    </LocalizationProvider>
  );
}
