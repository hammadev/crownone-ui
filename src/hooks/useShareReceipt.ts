import * as Sharing from "expo-sharing";
import { useStrings } from "../theme/strings";
import { useCallback, useRef, useState } from "react";
import type ViewShot from "react-native-view-shot";

/**
 * Captures a `ShareableReceipt` (ViewShot) as a PNG and opens the share sheet.
 * Attach `receiptRef` to the receipt and call `shareReceipt` from a button.
 */
export function useShareReceipt() {
  const strings = useStrings();
  const receiptRef = useRef<ViewShot>(null);
  const sharingRef = useRef(false);
  const [isSharing, setIsSharing] = useState(false);

  const shareReceipt = useCallback(async () => {
    const receipt = receiptRef.current;
    if (sharingRef.current || !receipt?.capture) return;
    sharingRef.current = true;
    setIsSharing(true);
    try {
      const uri = await receipt.capture();
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        UTI: "public.png",
        dialogTitle: strings.shareReceipt,
      });
    } catch {
      // Share sheet dismissed or capture failed; nothing to recover.
    } finally {
      sharingRef.current = false;
      setIsSharing(false);
    }
  }, [strings.shareReceipt]);

  return { receiptRef, shareReceipt, isSharing };
}
