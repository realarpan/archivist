"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gear, User } from "@phosphor-icons/react/dist/ssr";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useProfileSettings } from "@/lib/api/calendar";

import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import SignInDialog from "@/components/auth/sign-in-dialog";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { data: profileData } = useProfileSettings();
  const [signInOpen, setSignInOpen] = useState(false);

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <>
        <Button variant="outline" onClick={() => setSignInOpen(true)}>
          Sign In
        </Button>
        <SignInDialog open={signInOpen} onOpenChange={setSignInOpen} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        {session.user.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card w-fit">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-muted-foreground">
            {session.user.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Gear className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const profileSlug =
                profileData?.settings?.publicSlug || session.user.id;
              router.push(`/profile/${profileSlug}`);
            }}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Public Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              });
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
