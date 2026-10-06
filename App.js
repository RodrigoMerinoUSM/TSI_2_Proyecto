import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ADMIN_HISTORY, INITIAL_ORDERS, INITIAL_USERS, OTHER_TODAY_ROUTES, ROUTE_HISTORY } from "./src/data/mockData";
import { styles } from "./src/styles/appStyles";
import { C } from "./src/theme/colors";
import { delivered, exportExcel, fmt, pending, reportRows, sum } from "./src/utils/reportUtils";

function Icon({ name, size = 20, color = C.muted }) {
  return <Ionicons name={name} size={size} color={color} />;
}

function AppScreen({ children, scroll = true, bottomNav }) {
  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, bottomNav && styles.contentWithNav]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.flex}>{children}</View>
  );
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="light" />
      {content}
      {bottomNav}
    </SafeAreaView>
  );
}

function Header({ admin = false, subtitle, onLogout }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBrand}>
        <View style={styles.miniLogo}>
          <Icon name={admin ? "shield-checkmark" : "time"} size={14} color={C.text} />
        </View>
        <Text style={styles.headerTitle}>{admin ? "Panel Administrador" : "Courier Regist"}</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerRoute}>{admin ? "12.345.678-9" : "Ruta R-042"}</Text>
        {onLogout ? (
          <Pressable onPress={onLogout}><Text style={styles.linkSmall}>Cerrar sesión</Text></Pressable>
        ) : subtitle ? <Text style={styles.micro}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

function BottomNav({ active, onTab, admin = false }) {
  const tabs = admin
    ? [
      ["hoy", "Hoy", "cube-outline"],
      ["historial", "Historial", "time-outline"],
      ["desglose", "Desglose", "bar-chart-outline"],
      ["config", "Config.", "settings-outline"],
    ]
    : [
      ["ordenes", "Órdenes", "cube-outline"],
      ["historial", "Historial", "time-outline"],
      ["movimientos", "Movimientos", "swap-vertical-outline"],
      ["usuario", "Usuario", "person-outline"],
    ];
  return (
    <View style={styles.bottomNav}>
      {tabs.map(([id, label, icon]) => (
        <Pressable key={id} onPress={() => onTab(id)} style={styles.navItem}>
          <Icon name={icon} size={22} color={active === id ? C.blue : C.dim} />
          <Text style={[styles.navLabel, active === id && styles.navLabelActive]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function Button({ title, onPress, kind = "primary", disabled = false, icon, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        kind === "secondary" && styles.buttonSecondary,
        kind === "danger" && styles.buttonDanger,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {icon && <Icon name={icon} size={17} color={disabled ? C.dim : C.text} />}
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
    </Pressable>
  );
}

function Field({ label, value, onChangeText, placeholder, secureTextEntry, right }) {
  return (
    <View style={styles.fieldWrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.fieldRow}>
        <TextInput
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={C.dim}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, right && styles.inputWithRight]}
        />
        {right && <View style={styles.inputRight}>{right}</View>}
      </View>
    </View>
  );
}

function Search({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.search}>
      <Icon name="search" size={16} color={C.dim} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.dim}
        style={styles.searchInput}
      />
      {!!value && (
        <Pressable onPress={() => onChangeText("")}>
          <Icon name="close-circle" size={17} color={C.dim} />
        </Pressable>
      )}
    </View>
  );
}

function BackButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.back}>
      <Icon name="chevron-back" size={20} color={C.muted} />
      <Text style={styles.backText}>{title}</Text>
    </Pressable>
  );
}

function Stat({ value, label, color = C.text, icon }) {
  return (
    <Card style={styles.stat}>
      {icon && <Icon name={icon} size={18} color={color} />}
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.micro}>{label}</Text>
    </Card>
  );
}

function StatusBadge({ status }) {
  const color = status === "Entregado" ? C.green : status === "No entregado" ? C.red : C.amber;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.badgeText, { color }]}>{status}</Text>
    </View>
  );
}

function Progress({ value, color = C.blue }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressBar, { width: `${Math.min(100, value)}%`, backgroundColor: color }]} />
    </View>
  );
}

function OrderRow({ order, onPress }) {
  const body = (
    <View style={styles.rowBetween}>
      <View style={styles.flex}>
        <StatusBadge status={order.status} />
        <Text style={styles.rowTitle}>{order.id}</Text>
        <Text style={styles.rowSub}>{order.commune}{order.time ? ` · ${order.time}` : ""}</Text>
      </View>
      <View style={styles.alignEnd}>
        <Text style={styles.amount}>{fmt(order.amount)}</Text>
        {onPress && <Text style={styles.linkSmall}>{order.status === "Entregado" ? "Cambiar" : "Registrar"}</Text>}
      </View>
    </View>
  );
  return onPress ? <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>{body}</Pressable> : <Card>{body}</Card>;
}

function FilterBar({ value, onChange, items }) {
  return (
    <View style={styles.filterRow}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            style={[styles.filter, active && { borderColor: item.color || C.blue, backgroundColor: `${item.color || C.blue}20` }]}
          >
            {item.count !== undefined && (
              <View style={styles.filterCountRow}>
                {item.icon && <Icon name={item.icon} size={15} color={active ? item.color || C.blue : C.muted} />}
                <Text style={styles.filterCount}>{item.count}</Text>
              </View>
            )}
            <Text style={[styles.filterText, active && styles.filterTextActive]} numberOfLines={1}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function LoginScreen({ onLogin, onAdmin }) {
  const [route, setRoute] = useState("R-042");
  const [rut, setRut] = useState("12.345.678-9");
  return (
    <AppScreen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.login}>
        <View style={styles.logo}><Icon name="layers" size={34} color={C.text} /></View>
        <Text style={styles.loginTitle}>Courier <Text style={{ color: C.blue }}>Regist</Text></Text>
        <Text style={styles.loginSubtitle}>Sistema de registro de encomiendas</Text>
        <Card style={styles.loginCard}>
          <View style={styles.sectionTitleRow}>
            <Icon name="car-outline" color={C.blue} />
            <Text style={styles.sectionTitle}>Acceso Repartidor</Text>
          </View>
          <Field label="NÚMERO DE RUTA" value={route} onChangeText={setRoute} placeholder="Ej: R-042" />
          <Field label="RUT" value={rut} onChangeText={setRut} placeholder="12.345.678-9" />
          <Button title="Ingresar" icon="arrow-forward" onPress={onLogin} />
        </Card>
        <Pressable onPress={onAdmin} style={styles.adminAccess}>
          <Icon name="add-circle-outline" size={16} />
          <Text style={styles.muted}>Ingresar como Administrador</Text>
        </Pressable>
        <Text style={styles.version}>Courier Regist · v2.1.0</Text>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

function AdminLoginScreen({ onBack, onLogin }) {
  const [rut, setRut] = useState("12.345.678-9");
  const [password, setPassword] = useState("administrador");
  const [visible, setVisible] = useState(false);
  return (
    <AppScreen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <BackButton title="Volver" onPress={onBack} />
        <View style={styles.login}>
          <View style={[styles.logo, styles.adminLogo]}><Icon name="shield-checkmark" size={34} color={C.blue} /></View>
          <Text style={styles.loginTitle}>Acceso Administrador</Text>
          <Text style={styles.loginSubtitle}>Jefe de Operaciones</Text>
          <Card style={styles.loginCard}>
            <Field label="RUT ADMINISTRADOR" value={rut} onChangeText={setRut} />
            <Field
              label="CONTRASEÑA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visible}
              right={<Pressable onPress={() => setVisible(!visible)}><Icon name={visible ? "eye-off" : "eye"} /></Pressable>}
            />
            <Button title="Ingresar al Panel" icon="arrow-forward" onPress={onLogin} />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

function OrdersScreen({ orders, onOrder, onTab }) {
  const [filter, setFilter] = useState("todos");
  const waiting = pending(orders);
  const done = delivered(orders);
  const list = filter === "Pendiente" ? waiting : filter === "Entregado" ? done : orders;
  return (
    <AppScreen bottomNav={<BottomNav active="ordenes" onTab={onTab} />}>
      <Header subtitle="RUT: 12.345.678-9" />
      <FilterBar value={filter} onChange={setFilter} items={[
        { value: "Pendiente", label: "Pendientes", count: waiting.length, color: C.amber, icon: "time-outline" },
        { value: "Entregado", label: "Entregados", count: done.length, color: C.green, icon: "checkmark-circle" },
        { value: "todos", label: "Total", count: orders.length, color: C.blue, icon: "cube-outline" },
      ]} />
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Órdenes del día</Text>
        <Text style={[styles.smallBold, { color: C.amber }]}>Saldo pend. {fmt(sum(waiting))}</Text>
      </View>
      <View style={styles.gap8}>
        {list.map((order) => <OrderRow key={order.id} order={order} onPress={() => onOrder(order.id)} />)}
        {!list.length && <Empty text="Sin órdenes en esta categoría" />}
      </View>
    </AppScreen>
  );
}

function HistoryScreen({ onTab }) {
  const [routeId, setRouteId] = useState(null);
  const route = ROUTE_HISTORY.find((item) => item.route === routeId);
  if (route) {
    const done = delivered(route.packages);
    return (
      <AppScreen bottomNav={<BottomNav active="historial" onTab={onTab} />}>
        <BackButton title="Historial" onPress={() => setRouteId(null)} />
        <View style={styles.rowBetween}>
          <View><Text style={styles.pageTitle}>Ruta {route.route}</Text><Text style={styles.muted}>{route.date} · {route.repartidor}</Text></View>
          <View style={styles.alignEnd}><Text style={styles.amount}>{fmt(sum(done))}</Text><Text style={styles.micro}>recaudado</Text></View>
        </View>
        <View style={styles.pills}>
          <StatusBadge status={`${done.length} entregados`} />
          <StatusBadge status={`${route.packages.length - done.length} no entregados`} />
        </View>
        <Text style={styles.label}>{route.packages.length} PAQUETES EN ESTA RUTA</Text>
        <View style={styles.gap8}>{route.packages.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </AppScreen>
    );
  }
  return (
    <AppScreen bottomNav={<BottomNav active="historial" onTab={onTab} />}>
      <Header subtitle="RUT: 12.345.678-9" />
      <Text style={styles.pageTitle}>Historial por ruta</Text>
      <Text style={styles.mutedBlock}>Selecciona una ruta para ver sus paquetes</Text>
      <View style={styles.gap10}>
        {ROUTE_HISTORY.map((item) => {
          const done = delivered(item.packages);
          const pct = Math.round((done.length / item.packages.length) * 100);
          return (
            <Pressable key={item.route} onPress={() => setRouteId(item.route)} style={styles.card}>
              <View style={styles.rowBetween}>
                <View><Text style={styles.rowTitle}>Ruta {item.route}</Text><Text style={styles.rowSub}>{item.date} · {item.repartidor}</Text></View>
                <Icon name="chevron-forward" />
              </View>
              <Progress value={pct} color={pct === 100 ? C.green : C.blue} />
              <Text style={styles.micro}>{done.length} entregados · {item.packages.length - done.length} no entregados</Text>
            </Pressable>
          );
        })}
      </View>
    </AppScreen>
  );
}

function MovementsScreen({ orders, onTab }) {
  const done = delivered(orders);
  const cash = done.filter((order) => order.payMethod === "Efectivo");
  const debit = done.filter((order) => order.payMethod === "Débito");
  const failed = orders.filter((order) => order.status === "No entregado");
  return (
    <AppScreen bottomNav={<BottomNav active="movimientos" onTab={onTab} />}>
      <Header subtitle="Ruta R-042" />
      <Text style={styles.pageTitle}>Movimientos del día</Text>
      <View style={styles.twoColumns}>
        <Stat value={fmt(sum(cash))} label={`${cash.length} en efectivo`} color={C.amber} icon="cash-outline" />
        <Stat value={fmt(sum(debit))} label={`${debit.length} con débito`} color={C.blue} icon="card-outline" />
      </View>
      <Card>
        <InfoRow label="Total recaudado hoy" value={fmt(sum(done))} />
        <InfoRow label="Saldo pendiente" value={fmt(sum(pending(orders)))} color={C.amber} />
      </Card>
      <Text style={styles.label}>ENTREGAS REGISTRADAS</Text>
      <View style={styles.gap8}>
        {done.map((item) => <OrderRow key={item.id} order={item} />)}
        {!done.length && <Empty text="Sin entregas registradas aún" />}
      </View>
      {!!failed.length && <>
        <Text style={styles.label}>NO ENTREGADOS</Text>
        <View style={styles.gap8}>{failed.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </>}
    </AppScreen>
  );
}

function UserScreen({ onTab, onFinish }) {
  return (
    <AppScreen bottomNav={<BottomNav active="usuario" onTab={onTab} />}>
      <Header subtitle="RUT: 12.345.678-9" />
      <View style={styles.profile}>
        <View style={styles.avatar}><Icon name="person" size={38} color={C.text} /></View>
        <Text style={styles.pageTitle}>Jorge Espinoza Ramos</Text>
        <Text style={styles.muted}>RUT: 12.345.678-9</Text>
        <View style={styles.routePill}><Text style={styles.linkSmall}>Ruta R-042</Text></View>
      </View>
      <Card>
        <InfoRow label="Ruta asignada" value="R-042" />
        <InfoRow label="Fecha de ingreso" value="01 Mar 2023" />
        <InfoRow label="Entregas totales" value="1.247" />
        <InfoRow label="Calificación" value="4.9 / 5" />
      </Card>
      <Button title="Terminar ruta" icon="checkmark-done" onPress={onFinish} style={styles.marginTop16} />
    </AppScreen>
  );
}

function FinishRouteScreen({ orders, onBack, onLogout }) {
  const [exported, setExported] = useState(false);
  const [loading, setLoading] = useState(false);
  async function generate() {
    setLoading(true);
    const ok = await exportExcel("Ruta_R-042_10Ene2024.xlsx", reportRows(orders));
    setLoading(false);
    if (ok) setExported(true);
  }
  return (
    <AppScreen>
      <BackButton title="Usuario" onPress={onBack} />
      <Text style={styles.pageTitle}>Terminar Ruta</Text>
      <Text style={styles.mutedBlock}>R-042 · 10 Ene 2024 · Jorge Espinoza</Text>
      <Text style={styles.label}>RESUMEN DE LA RUTA</Text>
      <View style={styles.twoColumns}>
        <Stat value={delivered(orders).length} label="Entregados" color={C.green} icon="checkmark-circle" />
        <Stat value={pending(orders).length} label="No entregados" color={C.red} icon="close-circle" />
      </View>
      <Card>
        <InfoRow label="Total recaudado" value={fmt(sum(delivered(orders)))} />
        <InfoRow label="Saldo sin cobrar" value={fmt(sum(pending(orders)))} color={C.red} />
        <InfoRow label="Total de órdenes" value={String(orders.length)} />
      </Card>
      <Text style={styles.label}>DETALLE DE ÓRDENES</Text>
      <View style={styles.gap8}>{orders.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      <Text style={styles.label}>EXPORTAR REPORTE</Text>
      <Card>
        <View style={styles.sectionTitleRow}><Icon name="document-text" color={C.green} /><View><Text style={styles.rowTitle}>Ruta_R-042_10Ene2024.xlsx</Text><Text style={styles.rowSub}>{orders.length} órdenes · {fmt(sum(delivered(orders)))} recaudado</Text></View></View>
        {exported ? (
          <View style={styles.success}><Icon name="checkmark-circle" color={C.green} /><Text style={[styles.smallBold, { color: C.green }]}>Excel generado correctamente</Text></View>
        ) : (
          <Button title={loading ? "Generando..." : "Generar y compartir Excel"} icon="download" onPress={generate} disabled={loading} kind="secondary" />
        )}
      </Card>
      {!exported && <Text style={styles.lockText}>Debes generar el Excel para poder cerrar sesión.</Text>}
      <Button title="Cerrar sesión y finalizar" icon="log-out-outline" onPress={onLogout} disabled={!exported} kind="danger" />
    </AppScreen>
  );
}

function RouteFinishedScreen({ onLogin }) {
  return (
    <AppScreen scroll={false}>
      <View style={styles.confirmed}>
        <View style={[styles.confirmIcon, { borderColor: C.green }]}>
          <Icon name="checkmark" size={42} color={C.green} />
        </View>
        <Text style={styles.loginTitle}>Ruta finalizada</Text>
        <Text style={styles.mutedBlock}>La sesión del repartidor se cerró correctamente.</Text>
        <Button
          title="Volver al inicio de sesión"
          icon="log-in-outline"
          onPress={onLogin}
          style={styles.fullWidth}
        />
      </View>
    </AppScreen>
  );
}

function RegisterScreen({ order, onBack, onConfirm }) {
  const [status, setStatus] = useState(order.status === "No entregado" ? "No entregado" : "Entregado");
  const [payment, setPayment] = useState(order.payMethod || "Efectivo");
  const [confirmed, setConfirmed] = useState(false);
  if (confirmed) {
    return (
      <AppScreen>
        <View style={styles.confirmed}>
          <View style={[styles.confirmIcon, { borderColor: status === "Entregado" ? C.green : C.red }]}>
            <Icon name={status === "Entregado" ? "checkmark" : "close"} size={42} color={status === "Entregado" ? C.green : C.red} />
          </View>
          <Text style={styles.loginTitle}>{status === "Entregado" ? "Entrega registrada" : "Orden sin entregar"}</Text>
          <Text style={styles.mutedBlock}>{order.id}</Text>
          <Button title="Volver a Órdenes" onPress={onBack} style={styles.fullWidth} />
        </View>
      </AppScreen>
    );
  }
  return (
    <AppScreen>
      <BackButton title="Registrar Entrega" onPress={onBack} />
      <Card style={styles.highlightCard}>
        <Text style={styles.label}>ORDEN DE ENCOMIENDA</Text>
        <Text style={[styles.pageTitle, { color: C.blue }]}>{order.id}</Text>
        <View style={styles.twoColumns}>
          <InfoMini label="Saldo a cobrar" value={fmt(order.amount)} />
          <InfoMini label="Comuna" value={order.commune} />
        </View>
      </Card>
      <Text style={styles.stepTitle}>1  Estado de la entrega</Text>
      <ChoiceGrid value={status} onChange={setStatus} items={[
        { value: "Entregado", label: "Entregado", icon: "checkmark-circle", color: C.green },
        { value: "No entregado", label: "No entregado", icon: "close-circle", color: C.red },
      ]} />
      {status === "Entregado" && <>
        <Text style={styles.stepTitle}>2  Método de pago</Text>
        <ChoiceGrid value={payment} onChange={setPayment} items={[
          { value: "Efectivo", label: "Efectivo", icon: "cash-outline", color: C.amber },
          { value: "Débito", label: "Débito", icon: "card-outline", color: C.blue },
        ]} />
      </>}
      <Button
        title="Confirmar Registro"
        icon="checkmark"
        style={styles.marginTop16}
        onPress={() => {
          onConfirm(order.id, status, payment);
          setConfirmed(true);
        }}
      />
    </AppScreen>
  );
}

function ChoiceGrid({ value, onChange, items }) {
  return (
    <View style={styles.twoColumns}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <Pressable key={item.value} onPress={() => onChange(item.value)} style={[styles.choice, active && { borderColor: item.color, backgroundColor: `${item.color}16` }]}>
            <Icon name={item.icon} size={30} color={active ? item.color : C.dim} />
            <Text style={[styles.smallBold, { color: active ? item.color : C.muted }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AdminTodayScreen({ routes, onTab, onLogout }) {
  const [query, setQuery] = useState("");
  const [routeId, setRouteId] = useState(null);
  const [filter, setFilter] = useState("todos");
  const route = routes.find((item) => item.route === routeId);
  if (route) {
    const list = filter === "todos" ? route.packages : filter === "Pendiente" ? pending(route.packages) : delivered(route.packages);
    return (
      <AppScreen bottomNav={<BottomNav admin active="hoy" onTab={onTab} />}>
        <BackButton title="Hoy" onPress={() => { setRouteId(null); setFilter("todos"); }} />
        <View style={styles.rowBetween}>
          <View style={styles.flex}><Text style={styles.pageTitle}>Ruta {route.route}</Text><Text style={styles.muted}>{route.repartidor}</Text></View>
          <Text style={styles.amount}>{fmt(sum(delivered(route.packages)))}</Text>
        </View>
        <FilterBar value={filter} onChange={setFilter} items={[
          { value: "Pendiente", label: "No entregados", count: pending(route.packages).length, color: C.red, icon: "alert-circle-outline" },
          { value: "Entregado", label: "Entregados", count: delivered(route.packages).length, color: C.green, icon: "checkmark-circle" },
          { value: "todos", label: "Total", count: route.packages.length, color: C.blue, icon: "cube-outline" },
        ]} />
        <View style={styles.gap8}>{list.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </AppScreen>
    );
  }
  const normalized = query.toLowerCase();
  const filtered = routes.filter((item) => !normalized || item.route.toLowerCase().includes(normalized) || item.repartidor.toLowerCase().includes(normalized));
  const all = routes.flatMap((item) => item.packages);
  return (
    <AppScreen bottomNav={<BottomNav admin active="hoy" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <View style={styles.twoColumns}>
        <Stat value={all.length} label={`${delivered(all).length} entregadas`} icon="cube-outline" />
        <Stat value={fmt(sum(delivered(all)))} label="Recaudación hoy" color={C.blue} icon="wallet-outline" />
      </View>
      <Text style={styles.pageTitle}>Rutas activas hoy</Text>
      <Text style={styles.mutedBlock}>Presiona una ruta para ver sus paquetes</Text>
      <Search value={query} onChangeText={setQuery} placeholder="Buscar ruta o repartidor..." />
      <RouteList routes={filtered} onPress={setRouteId} />
      {!filtered.length && <Empty text={`Sin resultados para "${query}"`} />}
    </AppScreen>
  );
}

function RouteList({ routes, onPress }) {
  return (
    <View style={styles.gap10}>
      {routes.map((route) => {
        const done = delivered(route.packages);
        const pct = Math.round((done.length / route.packages.length) * 100);
        return (
          <Pressable key={route.route} onPress={() => onPress(route.route)} style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={styles.routeInfo}><View style={styles.routeIcon}><Icon name="car-outline" color={C.blue} /></View><View><Text style={styles.rowTitle}>Ruta {route.route}</Text><Text style={styles.rowSub} numberOfLines={1}>{route.repartidor}</Text></View></View>
              <View style={styles.alignEnd}><Text style={styles.amount}>{fmt(sum(done))}</Text><Text style={styles.micro}>{route.packages.length} paquetes</Text></View>
            </View>
            <Progress value={pct} color={pct === 100 ? C.green : C.blue} />
            <Text style={styles.micro}>{done.length} entregados · {route.packages.length - done.length} no entregados</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AdminHistoryRouteList({ routes, onPress }) {
  return (
    <View style={styles.gap10}>
      {routes.map((route) => {
        const done = delivered(route.packages);
        const notDelivered = pending(route.packages);
        const percentage = route.packages.length ? Math.round((done.length / route.packages.length) * 100) : 0;
        const progressColor = percentage === 100 ? C.green : C.blue;
        return (
          <Pressable
            accessibilityRole="button"
            key={route.route}
            onPress={() => onPress(route.route)}
            style={({ pressed }) => [styles.card, styles.historyRouteCard, pressed && styles.pressed]}
          >
            <View style={styles.rowBetween}>
              <View style={styles.routeInfo}>
                <View style={styles.routeIcon}><Icon name="car-outline" color={C.blue} /></View>
                <View style={styles.flex}>
                  <Text style={styles.rowTitle}>Ruta {route.route}</Text>
                  <Text style={styles.rowSub} numberOfLines={1}>{route.repartidor}</Text>
                </View>
              </View>
              <View style={styles.alignEnd}>
                <Text style={styles.amount}>{fmt(sum(route.packages))}</Text>
                <Text style={styles.micro}>{route.packages.length} paquetes</Text>
              </View>
            </View>
            <View style={styles.historyRouteProgressRow}>
              <View style={styles.historyRouteProgressTrack}>
                <View style={[styles.historyRouteProgressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
              </View>
              <Text style={[styles.historyRoutePercentage, { color: progressColor }]}>{percentage}%</Text>
            </View>
            <View style={styles.historyRouteFooter}>
              <View style={styles.historyDayStats}>
                <Text style={styles.historyDelivered}>✓ {done.length} entregados</Text>
                {!!notDelivered.length && <Text style={styles.historyFailed}>× {notDelivered.length} no entregados</Text>}
              </View>
              <Icon name="chevron-forward" size={16} color={C.dim} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function AdminHistoryChart() {
  const days = [...ADMIN_HISTORY].reverse().map((item) => {
    const packages = item.routes.flatMap((routeItem) => routeItem.packages);
    const total = sum(packages);
    const collected = sum(delivered(packages));
    return {
      label: item.label === "Hace 3 días" ? "3 días" : item.label === "Hace 2 días" ? "2 días" : item.label,
      total,
      percentage: total ? Math.round((collected / total) * 100) : 0,
    };
  });
  const maxTotal = Math.max(...days.map((day) => day.total), 1);

  return (
    <Card style={styles.historyChart}>
      <Text style={styles.historyChartTitle}>Recaudación comparada</Text>
      <View style={styles.historyBars}>
        {days.map((day, index) => (
          <View key={day.label} style={styles.historyBarColumn}>
            <Text style={styles.historyBarValue}>{day.percentage}%</Text>
            <View
              style={[
                styles.historyBar,
                index === days.length - 1 && styles.historyBarLatest,
                { height: Math.max(24, Math.round((day.total / maxTotal) * 58)) },
              ]}
            />
            <Text style={styles.historyBarLabel}>{day.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function AdminHistoryScreen({ onTab, onLogout }) {
  const [dayLabel, setDayLabel] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("todos");
  const day = ADMIN_HISTORY.find((item) => item.label === dayLabel);
  const route = day?.routes.find((item) => item.route === routeId);
  if (day && route) {
    const list = filter === "todos" ? route.packages : filter === "Pendiente" ? pending(route.packages) : delivered(route.packages);
    return (
      <AppScreen bottomNav={<BottomNav admin active="historial" onTab={onTab} />}>
        <BackButton title={day.label} onPress={() => { setRouteId(null); setFilter("todos"); }} />
        <View style={styles.rowBetween}>
          <View><Text style={styles.pageTitle}>Ruta {route.route}</Text><Text style={styles.muted}>{route.repartidor} · {day.date}</Text></View>
          <Pressable style={styles.exportIcon} onPress={() => exportExcel(`Ruta_${route.route}_${day.date.replaceAll(" ", "_")}.xlsx`, reportRows(route.packages))}>
            <Icon name="download" color={C.green} /><Text style={[styles.micro, { color: C.green }]}>Excel</Text>
          </Pressable>
        </View>
        <FilterBar value={filter} onChange={setFilter} items={[
          { value: "Pendiente", label: "No entregados", count: pending(route.packages).length, color: C.red, icon: "alert-circle-outline" },
          { value: "Entregado", label: "Entregados", count: delivered(route.packages).length, color: C.green, icon: "checkmark-circle" },
          { value: "todos", label: "Total", count: route.packages.length, color: C.blue, icon: "cube-outline" },
        ]} />
        <View style={styles.gap8}>{list.map((item) => <OrderRow key={item.id} order={item} />)}</View>
      </AppScreen>
    );
  }
  if (day) {
    const normalized = query.toLowerCase();
    const routes = day.routes.filter((item) => !normalized || item.route.toLowerCase().includes(normalized) || item.repartidor.toLowerCase().includes(normalized));
    const all = day.routes.flatMap((item) => item.packages);
    return (
      <AppScreen bottomNav={<BottomNav admin active="historial" onTab={onTab} />}>
        <BackButton title="Historial" onPress={() => { setDayLabel(null); setQuery(""); }} />
        <View style={styles.historySelectedDayHeader}>
          <View><Text style={styles.pageTitle}>{day.label}</Text><Text style={styles.muted}>{day.date}</Text></View>
          <View style={styles.historySelectedDayActions}>
            <View style={styles.alignEnd}><Text style={styles.historySelectedDayTotal}>{fmt(sum(all))}</Text><Text style={styles.micro}>total recaudado</Text></View>
            <Pressable accessibilityRole="button" style={styles.exportIcon} onPress={() => exportExcel(`Historial_${day.date.replaceAll(" ", "_")}.xlsx`, reportRows(all))}>
              <Icon name="download" color={C.green} /><Text style={[styles.micro, { color: C.green }]}>Excel</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.historyRouteHint}>Presiona una ruta para ver sus paquetes</Text>
        <Search value={query} onChangeText={setQuery} placeholder="Buscar ruta o repartidor..." />
        <AdminHistoryRouteList routes={routes} onPress={setRouteId} />
        {!routes.length && <Empty text={`Sin resultados para "${query}"`} />}
      </AppScreen>
    );
  }
  return (
    <AppScreen bottomNav={<BottomNav admin active="historial" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <Text style={styles.pageTitle}>Historial global</Text>
      <Text style={styles.mutedBlock}>Todas las rutas del servidor · últimos 3 días</Text>
      <AdminHistoryChart />
      <View style={styles.gap10}>
        {ADMIN_HISTORY.map((item) => {
          const all = item.routes.flatMap((routeItem) => routeItem.packages);
          const done = delivered(all);
          const notDelivered = pending(all);
          return (
            <Pressable
              accessibilityRole="button"
              key={item.label}
              onPress={() => setDayLabel(item.label)}
              style={({ pressed }) => [styles.card, styles.historyDayCard, pressed && styles.pressed]}
            >
              <View style={styles.rowBetween}>
                <View><Text style={styles.rowTitle}>{item.label}</Text><Text style={styles.rowSub}>{item.date} · {item.routes.length} rutas</Text></View>
                <View style={styles.historyDayAmount}>
                  <View style={styles.alignEnd}><Text style={styles.amount}>{fmt(sum(all))}</Text><Text style={styles.micro}>{all.length} paquetes</Text></View>
                  <Icon name="chevron-forward" size={17} color={C.dim} />
                </View>
              </View>
              <View style={styles.historyDayStats}>
                <Text style={styles.historyDelivered}>✓ {done.length} entregados</Text>
                <Text style={styles.historyFailed}>× {notDelivered.length} no entregados</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </AppScreen>
  );
}

function AdminBreakdownScreen({ onTab, onLogout }) {
  const days = [
    { label: "Hoy", date: "10 Ene", cash: 8750, debit: 0 },
    { label: "Ayer", date: "09 Ene", cash: 28000, debit: 24480 },
    { label: "Hace 2 días", date: "08 Ene", cash: 12300, debit: 17800 },
    { label: "Hace 3 días", date: "07 Ene", cash: 23700, debit: 9800 },
  ];
  return (
    <AppScreen bottomNav={<BottomNav admin active="desglose" onTab={onTab} />}>
      <Header admin onLogout={onLogout} />
      <Text style={styles.pageTitle}>Desglose por método de pago</Text>
      <View style={styles.gap10}>
        {days.map((day) => {
          const total = day.cash + day.debit;
          const pct = total ? Math.round((day.cash / total) * 100) : 0;
          return (
            <Card key={day.label}>
              <View style={styles.rowBetween}><Text style={styles.rowTitle}>{day.label} <Text style={styles.micro}>{day.date}</Text></Text><Text style={styles.amount}>{fmt(total)}</Text></View>
              <Progress value={pct} color={C.green} />
              <View style={styles.twoColumns}>
                <InfoMini label={`Efectivo ${pct}%`} value={fmt(day.cash)} />
                <InfoMini label={`Débito ${100 - pct}%`} value={fmt(day.debit)} />
              </View>
            </Card>
          );
        })}
      </View>
    </AppScreen>
  );
}

function AdminConfigScreen({ onTab, onLogout }) {
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

function Setting({ label, sub, value, onChange }) {
  return (
    <Card style={styles.setting}>
      <View style={styles.flex}><Text style={styles.rowTitle}>{label}</Text><Text style={styles.rowSub}>{sub}</Text></View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: C.line, true: C.blueDark }} thumbColor={C.text} />
    </Card>
  );
}

function InfoRow({ label, value, color = C.text }) {
  return <View style={styles.infoRow}><Text style={styles.muted}>{label}</Text><Text style={[styles.smallBold, { color }]}>{value}</Text></View>;
}

function InfoMini({ label, value }) {
  return <View style={styles.infoMini}><Text style={styles.micro}>{label}</Text><Text style={styles.smallBold}>{value}</Text></View>;
}

function Empty({ text }) {
  return <View style={styles.empty}><Icon name="cube-outline" size={34} color={C.dim} /><Text style={styles.muted}>{text}</Text></View>;
}

function BlueExpressApp() {
  const [screen, setScreen] = useState("login");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const todayRoutes = useMemo(() => [
    { route: "R-042", repartidor: "Jorge Espinoza Ramos", packages: orders },
    ...OTHER_TODAY_ROUTES,
  ], [orders]);

  function logout() {
    setOrders(INITIAL_ORDERS);
    setSelectedOrderId("");
    setScreen("login");
  }

  function finishRoute() {
    setOrders(INITIAL_ORDERS);
    setSelectedOrderId("");
    setScreen("ruta-finalizada");
  }

  function register(id, status, payment) {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setOrders((current) => current.map((order) => order.id === id ? {
      ...order,
      status,
      payMethod: status === "Entregado" ? payment : undefined,
      time,
    } : order));
  }

  const courierTab = (tab) => setScreen(tab);
  const adminTab = (tab) => setScreen(`admin-${tab}`);
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0];

  if (screen === "login") return <LoginScreen onLogin={() => setScreen("ordenes")} onAdmin={() => setScreen("login-admin")} />;
  if (screen === "login-admin") return <AdminLoginScreen onBack={() => setScreen("login")} onLogin={() => setScreen("admin-hoy")} />;
  if (screen === "ordenes") return <OrdersScreen orders={orders} onTab={courierTab} onOrder={(id) => { setSelectedOrderId(id); setScreen("registrar"); }} />;
  if (screen === "registrar") return <RegisterScreen order={selectedOrder} onBack={() => setScreen("ordenes")} onConfirm={register} />;
  if (screen === "historial") return <HistoryScreen onTab={courierTab} />;
  if (screen === "movimientos") return <MovementsScreen orders={orders} onTab={courierTab} />;
  if (screen === "usuario") return <UserScreen onTab={courierTab} onFinish={() => setScreen("terminar-ruta")} />;
  if (screen === "terminar-ruta") return <FinishRouteScreen orders={orders} onBack={() => setScreen("usuario")} onLogout={finishRoute} />;
  if (screen === "ruta-finalizada") return <RouteFinishedScreen onLogin={logout} />;
  if (screen === "admin-hoy") return <AdminTodayScreen routes={todayRoutes} onTab={adminTab} onLogout={logout} />;
  if (screen === "admin-historial") return <AdminHistoryScreen onTab={adminTab} onLogout={logout} />;
  if (screen === "admin-desglose") return <AdminBreakdownScreen onTab={adminTab} onLogout={logout} />;
  if (screen === "admin-config") return <AdminConfigScreen onTab={adminTab} onLogout={logout} />;
  return null;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <BlueExpressApp />
    </SafeAreaProvider>
  );
}
