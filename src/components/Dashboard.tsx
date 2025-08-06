import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl bg-neutral-900">
        <CardContent>
          <Tabs defaultValue="relogio" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="relogio">Relógio Mundial</TabsTrigger>
              <TabsTrigger value="cronometro">Cronômetro</TabsTrigger>
              <TabsTrigger value="temporizador">Temporizador</TabsTrigger>
              <TabsTrigger value="alarme">Alarme</TabsTrigger>
            </TabsList>
            <TabsContent value="relogio">
              <div className="text-center text-white font-mono py-8 text-xl">Relógio Mundial (em breve!)</div>
            </TabsContent>
            <TabsContent value="cronometro">
              <div className="text-center text-white font-mono py-8 text-xl">Cronômetro (em breve!)</div>
            </TabsContent>
            <TabsContent value="temporizador">
              <div className="text-center text-white font-mono py-8 text-xl">Temporizador (em breve!)</div>
            </TabsContent>
            <TabsContent value="alarme">
              <div className="text-center text-white font-mono py-8 text-xl">Alarme (em breve!)</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
