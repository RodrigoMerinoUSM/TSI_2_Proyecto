import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AppScreen, BackButton, BottomNav, Button, Card, Empty, Field, Header, Icon, Search, Setting } from "../../../components/common";
import { INITIAL_USERS } from "../../data";
import { styles } from "../../styles/appStyles";
import { C } from "../../theme/colors";

export function AdminConfigScreen({ onTab, onLogout }) {
  const [notifications, setNotifications] = useState(true);
  const [autoExport, setAutoExport] = useState(false);
  const [activeRoutes, setActiveRoutes] = useState(["R-042", "R-105"]);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [userPanel, setUserPanel] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [route, setRoute] = useState("R-042");
  const [role, setRole] = useState("Repartidor");
  const allRoutes = ["R-042", "R-105", "R-213", "R-078"];

  function addUser() {
    if (!name.trim() || !rut.trim() || !route.trim()) return;
    setUsers((current) => [...current, { id: Date.now(), name: name.trim(), rut: rut.trim(), route: route.trim().toUpperCase(), role }]);
    setName(""); setRut(""); setRoute("R-042"); setRole("Repartidor"); setAdding(false);
  }

  if (userPanel) {
    const suggestions = route.trim()
      ? allRoutes.filter((item) => item.toLowerCase().includes(route.trim().toLowerCase()) && item.toLowerCase() !== route.trim().toLowerCase())
      : [];
    return (
      <AppScreen bottomNav={<BottomNav admin active="config" onTab={onTab} />}>
        <View style={styles.rowBetween}>
          <BackButton title="Configuración" onPress={() => { setUserPanel(false); setAdding(false); }} />
          <Pressable style={styles.addButton} onPress={() => setAdding(true)}><Icon name="add" color={C.text} /><Text style={styles.smallBold}>Añadir</Text></Pressable>
        </View>
        <Text style={styles.pageTitle}>Gestión de Usuarios</Text>
        <Text style={styles.mutedBlock}>{users.length} usuarios registrados</Text>
        {adding && (
          <Card style={styles.highlightCard}>
            <Text style={[styles.sectionTitle, { color: C.blue }]}>Nuevo usuario</Text>
            <Field label="NOMBRE COMPLETO" value={name} onChangeText={setName} placeholder="Juan Pérez López" />
            <Field label="RUT" value={rut} onChangeText={setRut} placeholder="12.345.678-9" />
            <Field label="RUTA" value={route} onChangeText={setRoute} placeholder="R-042" />
            {!!suggestions.length && <View style={styles.suggestions}>{suggestions.map((item) => <Pressable key={item} onPress={() => setRoute(item)} style={styles.suggestion}><Text style={styles.body}>{item}</Text></Pressable>)}</View>}
            <Text style={styles.label}>ROL</Text>
            <View style={styles.twoColumns}>
              {["Repartidor", "Supervisor"].map((item) => <Pressable key={item} onPress={() => setRole(item)} style={[styles.roleChoice, role === item && styles.roleChoiceActive]}><Text style={[styles.smallBold, role === item && { color: C.blue }]}>{item}</Text></Pressable>)}
            </View>
            <View style={styles.twoColumns}>
              <Button title="Cancelar" kind="secondary" onPress={() => setAdding(false)} />
              <Button title="Guardar" onPress={addUser} disabled={!name.trim() || !rut.trim() || !route.trim()} />
            </View>
          </Card>
        )}
        <View style={styles.gap8}>
          {users.map((user) => (
            <Card key={user.id} style={deleteId === user.id && { borderColor: C.red }}>
              <View style={styles.rowBetween}>
                <View style={styles.routeInfo}>
                  <View style={[styles.userInitials, { backgroundColor: user.role === "Supervisor" ? `${C.purple}25` : `${C.blue}25` }]}><Text style={{ color: user.role === "Supervisor" ? C.purple : C.blue, fontWeight: "800" }}>{user.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</Text></View>
                  <View><Text style={styles.rowTitle}>{user.name}</Text><Text style={styles.rowSub}>{user.rut} · {user.route}</Text><Text style={[styles.micro, { color: user.role === "Supervisor" ? C.purple : C.blue }]}>{user.role}</Text></View>
                </View>
                <Pressable onPress={() => setDeleteId(deleteId === user.id ? null : user.id)}><Icon name="trash-outline" color={deleteId === user.id ? C.red : C.dim} /></Pressable>
              </View>
              {deleteId === user.id && <View style={styles.deleteConfirm}><Text style={[styles.small, styles.flex]}>¿Eliminar a {user.name.split(" ")[0]}?</Text><Pressable onPress={() => setDeleteId(null)}><Text style={styles.muted}>Cancelar</Text></Pressable><Pressable onPress={() => { setUsers(users.filter((item) => item.id !== user.id)); setDeleteId(null); }}><Text style={[styles.smallBold, { color: C.red }]}>Eliminar</Text></Pressable></View>}
            </Card>
          ))}
          {!users.length && <Empty text="Sin usuarios registrados" />}
        </View>
      </AppScreen>
    );
  }

  const visibleRoutes = allRoutes.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  return (
    <AppScreen bottomNav={<BottomNav admin active="config" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <Text style={styles.pageTitle}>Configuración</Text>
      <Card style={styles.highlightCard}>
        <View style={styles.routeInfo}><View style={styles.avatarSmall}><Icon name="person" color={C.text} /></View><View><Text style={styles.rowTitle}>Carlos Mendoza</Text><Text style={styles.rowSub}>Jefe de Operaciones</Text><Text style={styles.linkSmall}>RUT: 12.345.678-9</Text></View></View>
      </Card>
      <Text style={styles.label}>GESTIÓN DE USUARIOS</Text>
      <Pressable onPress={() => setUserPanel(true)} style={styles.card}>
        <View style={styles.rowBetween}><View style={styles.routeInfo}><Icon name="people-outline" color={C.blue} /><View><Text style={styles.rowTitle}>Usuarios del sistema</Text><Text style={styles.rowSub}>{users.length} registrados · Ver, añadir, eliminar</Text></View></View><Icon name="chevron-forward" /></View>
      </Pressable>
      <Text style={styles.label}>NOTIFICACIONES</Text>
      <Setting label="Entrega confirmada" sub="Alerta al registrar una entrega" value={notifications} onChange={setNotifications} />
      <Text style={styles.label}>EXPORTACIÓN</Text>
      <Setting label="Exportar Excel automático" sub="Genera reporte diario a las 23:00" value={autoExport} onChange={setAutoExport} />
      <Text style={styles.label}>RUTAS ACTIVAS</Text>
      <Search value={query} onChangeText={setQuery} placeholder="Buscar ruta..." />
      <Card style={styles.routeChips}>
        {visibleRoutes.map((item) => {
          const active = activeRoutes.includes(item);
          return <Pressable key={item} onPress={() => setActiveRoutes(active ? activeRoutes.filter((routeItem) => routeItem !== item) : [...activeRoutes, item])} style={[styles.routeChip, active && styles.routeChipActive]}><Text style={[styles.smallBold, { color: active ? C.blue : C.dim }]}>{item}</Text></Pressable>;
        })}
        {!visibleRoutes.length && <Text style={styles.muted}>Sin resultados</Text>}
      </Card>
      <Button title="Cerrar sesión" kind="danger" onPress={onLogout} style={styles.marginTop16} />
    </AppScreen>
  );
}
