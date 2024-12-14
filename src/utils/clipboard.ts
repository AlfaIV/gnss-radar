export const copyToClipboard = async (textToCopy: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    return true;
  } catch (err) {
    console.error("Ошибка копирования: ", err);
    return false;
  }
};
