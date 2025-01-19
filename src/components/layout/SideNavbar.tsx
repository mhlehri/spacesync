import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";

interface SideNavbarProps {
  onTabChange: (tab: string) => void;
}

export function SideNavbar({ onTabChange }: SideNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-52 p-0">
        <ScrollArea className="h-full">
          <div className="flex flex-col h-full">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  Dashboard
                </h2>
                <Tabs
                  defaultValue="rooms"
                  className="w-full"
                  orientation="vertical"
                  onValueChange={(value) => {
                    onTabChange(value);
                    setOpen(false);
                  }}
                >
                  <TabsList className="flex flex-col items-stretch h-full bg-muted">
                    <TabsTrigger value="rooms" className="justify-start">
                      Rooms
                    </TabsTrigger>
                    <TabsTrigger value="slots" className="justify-start">
                      Slots
                    </TabsTrigger>
                    <TabsTrigger value="bookings" className="justify-start">
                      Bookings
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
