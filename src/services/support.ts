export async function createSupportRequest(...args: any[]): Promise<{ success: boolean; error?: string }> {
  console.log("Support request submitted:", args);
  return { success: true };
}
