import { Kbar } from "@/adapters/ui/components/Kbar/CommandBar/Kbar";
import Loading from "@/adapters/ui/components/Loading/Loading";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function Providers({ children }: Props) {
	return (
		<>
			<Loading />
			<Kbar>{children}</Kbar>
		</>
	);
}
