export interface Component {
  component_name: string;
  component_by: string;
  component_img: string;
}

export interface ListItem {
  invoice_id: number;
  client_supporter?: string;
  delivery_order_ref: string;
  created_at: string;
  project_code: string;
  company: string;
  location: string;
  contact_person: string;
  contact_number: string;
  driver: string;
  client_ref: string;
  remark: string;
  component_at: string;
  components: Component[];
}

export interface Section {
  title: string;
  data: ListItem[];
}

export const componentOrder = [
  'shutterhood',
  'slat_and_bottom_bar',
  'side_guide',
  'cover',
  'cabling',
  'motor',
  'operation',
  't_and_c',
];
