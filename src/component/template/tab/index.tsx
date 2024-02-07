interface TabProps {
  tabs: {
    label: string;
    name: string;
  }[];
  selectedTab: string;
  handleSelectTab: (props: string) => void;
}
export const Tab = (props: TabProps) => {
  return (
    <ul className="flex flex-row w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 flex-start">
      {props.tabs.map((item) => (
        <li
          onClick={() => props.handleSelectTab(item.name)}
          className={`me-2 cursor-pointer inline-block px-4 py-3 bg-gray-50 text-black ${
            props.selectedTab === item.name && "!bg-blue-600 !text-white"
          } rounded-lg active`}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};
