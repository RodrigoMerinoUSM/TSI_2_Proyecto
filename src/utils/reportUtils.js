import { Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";

export const fmt = (number) => `$${Number(number).toLocaleString("es-CL")}`;
export const sum = (items) => items.reduce((total, item) => total + item.amount, 0);
export const delivered = (items) => items.filter((item) => item.status === "Entregado");
export const pending = (items) => items.filter((item) => item.status !== "Entregado");
export const reportRows = (items) => items.map((item) => ({
  Orden: item.id,
  Estado: item.status,
  Monto: item.amount,
  Comuna: item.commune,
  Dirección: item.address || "",
  Pago: item.payMethod || "",
  Hora: item.time || "",
}));

export async function exportExcel(fileName, rows) {
  try {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entregas");

    if (Platform.OS === "web") {
      const contents = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
      const blob = new Blob([contents], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      return true;
    }

    const base64 = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
    const uri = `${FileSystem.cacheDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Compartir reporte Excel",
        UTI: "org.openxmlformats.spreadsheetml.sheet",
      });
    } else {
      Alert.alert("Reporte generado", `Archivo guardado en ${uri}`);
    }
    return true;
  } catch (error) {
    Alert.alert("No se pudo exportar", "Intenta nuevamente.");
    return false;
  }
}
