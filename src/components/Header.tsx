import { Search, IconButton, Avatar, Icon, Badge } from "./ui";


const Header: React.FC = () => {
  return (
    <header
      className={`sticky top-0 h-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 flex justify-between items-center px-8 font-['Inter'] text-sm transition-all duration-300 ease-in-out w-full`}
    >
      <Search
        placeholder="Search analytics..."
        className="max-w-md hidden lg:block"
      />
      <div className="flex items-center gap-2">
        <IconButton
          icon={<Icon name="notifications" size="semixl" />}
          badge={
            <Badge variant="notifications" value={3} className="absolute top-2 right-2 text-[10px] h-4 w-4" />
          }
        />
        <IconButton icon={<Icon name="settings" size="lg" />} />
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden lg:block">
            <p className="font-bold text-gray-800">Alex Rivers</p>
            <p className="text-[10px] text-gray-500">@alex_rivers</p>
          </div>
          <Avatar
            size="md"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2cfI4vW4XPn0Q7d9Q7EEH1nj1clyZdohK9BILZPH9SpBX69YkBm9snbwQe97xUui6lA0U05QyMxRP9Wc2DB0zf05e9bq5jXIRSsXKto2t6SGPOGnN-OeiqLsH9H9NycJE4bh-aki2bGAhcCCzqEnQxh5pRG2ASWeDruRh22jxgPKIHmO5yaQpnZIT0-06AVWh-BAe3TQd_FQM6AUslkiCGw4eJoZhQqEjviMpjOAgAqoNKpnJbPJ08u0jWrUjeJtasmXxYUJnCQ"
            name="Alex Rivers"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
