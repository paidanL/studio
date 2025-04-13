'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Icons} from '@/components/icons';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
} from '@/components/ui/sidebar';
import {useTheme} from 'next-themes';
import {Button} from '@/components/ui/button';

const Navigation = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: 'transactions',
  },
  {
    title: 'Income',
    href: '/income',
    icon: 'income',
  },
  {
    title: 'Assets',
    href: '/assets',
    icon: 'assets',
  },
];

export default function SidebarContentComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {theme, setTheme} = useTheme();

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {Navigation.map((item) => {
            const IconComponent = Icons[item.icon];

            return (
            <SidebarMenuItem key={item.href} asChild>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton>
                  {/* Render the icon if it exists */}
                  {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup title="Preferences">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <>
                  <Icons.light className="mr-2 h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Icons.dark className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

