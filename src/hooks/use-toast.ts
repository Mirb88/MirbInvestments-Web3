export function useToast() {
  return { toast: (props: any) => console.log(props) };
}
export function toast(props: any) {
  console.log(props);
}
