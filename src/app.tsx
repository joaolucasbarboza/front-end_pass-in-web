import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

function App() {
  return (
    <div className="flex flex-col gap-5 max-w-[1216px] mx-auto">
      <Header />
      
      <AttendeeList />
    </div>
  );
}

export default App;
