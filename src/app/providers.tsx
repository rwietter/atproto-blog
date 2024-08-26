import { Kbar } from "@/ui/components/Kbar/CommandBar/Kbar";
import Loading from "@/ui/components/Loading/Loading";
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
