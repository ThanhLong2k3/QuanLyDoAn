export type AlignType = 'left' | 'center' | 'right';
export type ColumnType = {
  title: string;
  dataIndex?: string;
  key: string;
  align?:AlignType | undefined;
  render?: (text: any, record: any) => JSX.Element; 
};