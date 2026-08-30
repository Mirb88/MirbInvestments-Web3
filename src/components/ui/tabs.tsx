'import React from "react";'
export function Tabs({ children, defaultValue, className }: { children: React.ReactNode; defaultValue?: string; className?: string }) {
  return <div className={className}>{children}</div>;
}
export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex ${className || ''}`}>{children}</div>;
}
export function TabsTrigger({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  return <button className={className}>{children}</button>;
}
export function TabsContent({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  return <div className={className}>{children}</div>;
}
