<main class="flex-1">
	<div class="md:flex relative max-w-4xl mx-auto">
		<div class="hidden md:block sticky top-16 w-64 max-w-full"> 
			<div class="flex flex-col gap-6 p-8">
				<ul class="flex flex-col">
					<li><a class="text-slate-900 dark:text-zinc-200 font-medium text-sm transition-all" href="/settings/account">Account</a></li>
					<li><a class="text-slate-900 dark:text-zinc-200 font-medium text-sm transition-all" href="/settings/profile">Profile</a></li>
				
				</ul>
			</div>
		</div>
		<div class="flex-1 md:p-8 p-4">
            <slot />
		</div>
	</div>
</main>
